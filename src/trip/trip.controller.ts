import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles/role.decorator";
import { RoleGuard } from "src/auth/roles/role.guard";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@ApiTags("trip")
@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create trip",
    description: "Create a new trip with the provided details.",
  })
  @ApiResponse({
    status: 201,
    description: "The trip has been created.",
    type: CreateTripDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.GUIDE, Role.ADMIN)
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieve a list of all trips.",
  })
  @ApiResponse({
    status: 200,
    description: "A list of trips.",
    type: [CreateTripDto],
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get trip by ID",
    description: "Retrieve a specific trip by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "The trip with the specified ID.",
    type: CreateTripDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update trip",
    description: "Update the details of an existing trip.",
  })
  @ApiResponse({
    status: 200,
    description: "The trip has been updated.",
    type: UpdateTripDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.GUIDE, Role.ADMIN)
  async update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete trip",
    description: "Delete a trip by its ID.",
  })
  @ApiResponse({ status: 204, description: "The trip has been deleted." })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.GUIDE, Role.ADMIN)
  async remove(@Param("id", ParseIntPipe) id: string) {
    return this.tripService.remove(+id);
  }
}
