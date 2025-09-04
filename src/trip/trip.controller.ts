import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles/role.decorator";
import { RoleGuard } from "src/auth/roles/role.guard";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@ApiTags("trips")
@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles("COORDINATOR", "ADMIN")
  @Post()
  @ApiOperation({
    summary: "Creates a new trip",
    description:
      "Adds a new trip, you need to supply a name, description (optional), start_date and end_date",
  })
  @ApiResponse({
    status: 201,
    description: "trip created",
  })
  @ApiResponse({
    status: 203,
    description: "Insufficient permissions",
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @ApiOperation({
    summary: "Returns all trips",
    description: "Returns all trips",
  })
  @ApiResponse({
    status: 200,
    description: "Request successful",
  })
  @Get()
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Returns a trip with given id",
    description: "Given an id, returns a trip record with that id",
  })
  @ApiResponse({
    status: 200,
    description: "Request successful",
  })
  async findOne(@Param("id") id: string) {
    return this.tripService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles("COORDINATOR", "ADMIN")
  @Patch(":id")
  @ApiOperation({
    summary: "Updates a trip",
    description: "Given an id, updates that record with the given data",
  })
  @ApiResponse({
    status: 200,
    description: "Patch successful",
  })
  @ApiResponse({
    status: 203,
    description: "Insufficient permissions",
  })
  async update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles("COORDINATOR", "ADMIN")
  @Delete(":id")
  @ApiOperation({
    summary: "Deletes a trip with given id",
    description: "Given an id, deletes a trip record with that id",
  })
  @ApiResponse({
    status: 200,
    description: "Resource deleted",
  })
  @ApiResponse({
    status: 203,
    description: "Insufficient permissions",
  })
  async emove(@Param("id") id: string) {
    return this.tripService.remove(+id);
  }
}
