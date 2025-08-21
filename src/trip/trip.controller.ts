import { Prisma, Trip } from "@prisma/client";

import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { TripService } from "../trip/trip.service";

@ApiTags("trips")
@Controller("trips")
export class TripController {
  constructor(private tripService: TripService) {}

  @Post("/")
  @ApiOperation({ description: "Create a new trip" })
  async addTrip(@Body() data: Prisma.TripCreateInput): Promise<Trip> {
    return this.tripService.createTrip(data);
  }

  @Get("/")
  @ApiOperation({ description: "Get all trips" })
  async findAll(): Promise<Trip[]> {
    return this.tripService.all();
  }

  @Get("/:id")
  @ApiOperation({ description: "Get trip with id" })
  async findOne(@Param("id") id: string): Promise<Trip | null> {
    return this.tripService.trip({ trip_id: Number(id) });
  }
}
