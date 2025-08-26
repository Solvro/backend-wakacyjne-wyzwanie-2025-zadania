import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateTripDto } from "./dto/create-trip.dto";
import { TripsService } from "./trips.service";

@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async findAll() {
    return this.tripsService.findAll();
  }

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }
}
