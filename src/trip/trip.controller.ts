import { Prisma, Trip } from "@prisma/client";

import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { TripService } from "../trip/trip.service";

@Controller("trips")
export class TripController {
  constructor(private tripService: TripService) {}

  @Post("/")
  async addTrip(@Body() data: Prisma.TripCreateInput): Promise<Trip> {
    return this.tripService.createTrip(data);
  }

  @Get("/")
  async findAll(): Promise<Trip[]> {
    return this.tripService.all();
  }

  @Get("/:id")
  async findOne(@Param("id") id: string): Promise<Trip | null> {
    return this.tripService.trip({ trip_id: Number(id) });
  }
}
