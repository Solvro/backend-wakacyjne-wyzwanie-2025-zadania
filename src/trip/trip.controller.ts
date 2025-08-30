import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { Public } from "../common/decorators/public.decorator";
import { Roles } from "../common/decorators/roles.decorator";
import { CreateTripDto } from "./dto/create-trip.dto";
import { TripService } from "./trip.service";

@ApiTags("trips")
@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: "Get all trips" })
  @ApiOkResponse({ description: "List of trips" })
  async getAllTrips() {
    return this.tripService.getAllTrips();
  }

  @Post()
  @Roles("COORDINATOR", "ADMIN") // Only coordinators or admins can post
  @ApiOperation({ summary: "Create a new trip" })
  @ApiOkResponse({ description: "The created trip" })
  async createTrip(
    @Body() body: { name: string; startDate: string; budget?: number },
  ) {
    return this.tripService.createTrip({
      name: body.name,
      startDate: new Date(body.startDate),
      budget: body.budget,
    });
  }

  @Patch(":id")
  @Roles("COORDINATOR", "ADMIN") // Only coordinators or admins can update
  @ApiOperation({ summary: "Update a trip" })
  @ApiOkResponse({ description: "Updated trip" })
  async updateTrip(
    @Param("id") id: string,
    @Body() body: Partial<CreateTripDto>,
  ) {
    return this.tripService.updateTrip(Number(id), body);
  }
}
