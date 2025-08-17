import { TripCategory } from "@prisma/client";

import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";

interface CreateTripDTO {
  title: string;
  category?: TripCategory;
  destination?: string;
  fromDate?: string;
  toDate?: string;
  departure?: string;
  accommodation?: string;
  travelTime?: number;
  travelDistance?: number;
  note?: string;
  participantIds?: number[];
}

@Controller("trips")
export class TripsController {
  constructor(private prisma: DatabaseService) {}

  @Get()
  async getAllTrips() {
    return await this.prisma.trip.findMany({
      include: {
        participants: true,
        expenses: {
          include: {
            participant: true,
          },
        },
      },
    });
  }

  @Get(":id")
  async getTripById(@Param("id") id: string) {
    return await this.prisma.trip.findUnique({
      where: { id: Number.parseInt(id) },
      include: {
        participants: true,
        expenses: {
          include: {
            participant: true,
          },
        },
      },
    });
  }

  @Post()
  async createTrip(@Body() data: CreateTripDTO) {
    const { participantIds, ...tripData } = data;

    return await this.prisma.trip.create({
      data: {
        title: tripData.title,
        destination: tripData.destination,
        category: tripData.category,
        fromDate:
          tripData.fromDate !== undefined && tripData.fromDate !== ""
            ? new Date(tripData.fromDate)
            : null,
        toDate:
          tripData.toDate !== undefined && tripData.toDate !== ""
            ? new Date(tripData.toDate)
            : null,
        departure: tripData.departure,
        accommodation: tripData.accommodation,
        travelTime: tripData.travelTime,
        travelDistance: tripData.travelDistance,
        note: tripData.note,
        ...(participantIds !== undefined && participantIds.length > 0
          ? {
              participants: {
                connect: participantIds.map((id) => ({ id })),
              },
            }
          : {}),
      },
      include: {
        participants: true,
        expenses: {
          include: {
            participant: true,
          },
        },
      },
    });
  }

  @Delete(":id")
  async deleteTrip(@Param("id") id: string) {
    return await this.prisma.trip.delete({
      where: { id: Number.parseInt(id) },
    });
  }
}
