import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreateTripDto } from "./dto/create-trip.dto";
import { TripsService } from "./trips.service";

@ApiTags("trips")
@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  @ApiOperation({ summary: "Get all trips (public)" })
  @ApiResponse({ status: 200, description: "Return all trips." })
  async findAll() {
    return this.tripsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get trip by ID (public)" })
  @ApiParam({ name: "id", description: "Trip ID" })
  @ApiResponse({ status: 200, description: "Return trip details." })
  @ApiResponse({ status: 404, description: "Trip not found." })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new trip (requires authentication)" })
  @ApiResponse({
    status: 201,
    description: "The trip has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  async create(@Body() createTripDto: CreateTripDto, @CurrentUser() user: any) {
    return this.tripsService.create(createTripDto, user.id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update trip (only coordinator or admin)" })
  @ApiParam({ name: "id", description: "Trip ID" })
  @ApiResponse({ status: 200, description: "Trip updated successfully." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({
    status: 403,
    description: "Forbidden - insufficient permissions.",
  })
  @ApiResponse({ status: 404, description: "Trip not found." })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTripDto: Partial<CreateTripDto>,
    @CurrentUser() user: any,
  ) {
    const isCoordinator = await this.tripsService.isCoordinator(id, user.id);
    const isAdmin = user.role === "ADMIN";

    if (!isCoordinator && !isAdmin) {
      throw new ForbiddenException(
        "Only trip coordinator or admin can modify this trip",
      );
    }

    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete trip (only coordinator or admin)" })
  @ApiParam({ name: "id", description: "Trip ID" })
  @ApiResponse({ status: 200, description: "Trip deleted successfully." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({
    status: 403,
    description: "Forbidden - insufficient permissions.",
  })
  @ApiResponse({ status: 404, description: "Trip not found." })
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: any,
  ) {
    const isCoordinator = await this.tripsService.isCoordinator(id, user.id);
    const isAdmin = user.role === "ADMIN";

    if (!isCoordinator && !isAdmin) {
      throw new ForbiddenException(
        "Only trip coordinator or admin can delete this trip",
      );
    }

    return this.tripsService.remove(id);
  }
}
