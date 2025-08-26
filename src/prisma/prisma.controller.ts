import { Trip as TripModel } from "@prisma/client";

import { Controller, Delete, Get, Param } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

@Controller()
export class PrismaController {
  constructor(private prismaService: PrismaService) {}

  @Get("trip")
  async getTrip(): Promise<TripModel[]> {
    return await this.prismaService.trip.findMany();
  }

  @Get("trip/:id")
  async getTripById(@Param("id") id: string): Promise<TripModel | null> {
    return await this.prismaService.trip.findUnique({
      where: { id: Number(id) },
    });
  }

  @Delete("trip/:id")
  async deleteTrip(@Param("id") id: string): Promise<TripModel> {
    return await this.prismaService.trip.delete({
      where: { id: Number(id) },
    });
  }
}
