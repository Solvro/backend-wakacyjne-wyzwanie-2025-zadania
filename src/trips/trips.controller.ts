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
  Put,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import {
  CreateTripDto,
  UpdateTripDto,
  UpdateTripStatusDto,
} from "./dto/trip.dto";
import { TripsService } from "./trips.service";

@ApiTags("trips")
@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  // GET /trips - Get all trips
  @Get()
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieve a list of all trips",
  })
  @ApiOkResponse({
    description: "List of trips retrieved successfully",
    example: [
      {
        id: 1,
        name: "Summer Vacation 2025",
        description: "A wonderful summer vacation to the mountains",
        status: "PLANNED",
        startDate: "2025-07-01",
        endDate: "2025-07-15",
        budget: 150_000,
        createdAt: "2025-08-24T10:00:00Z",
        updatedAt: "2025-08-24T10:00:00Z",
      },
    ],
  })
  async getAllTrips() {
    return this.tripsService.findAll();
  }

  // GET /trips/:id - Get trip by ID
  @Get(":id")
  @ApiOperation({
    summary: "Get trip by ID",
    description: "Retrieve a specific trip by its ID",
  })
  @ApiParam({ name: "id", description: "Trip ID", type: "number" })
  @ApiOkResponse({
    description: "Trip retrieved successfully",
    example: {
      id: 1,
      name: "Summer Vacation 2025",
      description: "A wonderful summer vacation to the mountains",
      status: "PLANNED",
      startDate: "2025-07-01",
      endDate: "2025-07-15",
      budget: 150_000,
      createdAt: "2025-08-24T10:00:00Z",
      updatedAt: "2025-08-24T10:00:00Z",
    },
  })
  async getTripById(@Param("id", ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  // POST /trips - Create new trip
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create new trip",
    description: "Create a new trip with the provided details",
  })
  @ApiBody({
    type: CreateTripDto,
    description: "Trip creation data",
    examples: {
      example1: {
        summary: "Basic trip example",
        value: {
          name: "Summer Vacation 2025",
          description: "A wonderful summer vacation to the mountains",
          status: "PLANNED",
          startDate: "2025-07-01",
          endDate: "2025-07-15",
          budget: 150_000,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: "Trip created successfully",
    example: {
      id: 1,
      name: "Summer Vacation 2025",
      description: "A wonderful summer vacation to the mountains",
      status: "PLANNED",
      startDate: "2025-07-01",
      endDate: "2025-07-15",
      budget: 150_000,
      createdAt: "2025-08-24T10:00:00Z",
      updatedAt: "2025-08-24T10:00:00Z",
    },
  })
  async createTrip(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  // PUT /trips/:id - Update entire trip
  @Put(":id")
  @ApiOperation({
    summary: "Update trip",
    description: "Update a trip with new details",
  })
  @ApiParam({ name: "id", description: "Trip ID", type: "number" })
  @ApiBody({
    type: UpdateTripDto,
    description: "Trip update data",
    examples: {
      example1: {
        summary: "Update trip example",
        value: {
          name: "Updated Summer Vacation 2025",
          description: "Updated description for the vacation",
          status: "ACTIVE",
          startDate: "2025-07-01",
          endDate: "2025-07-20",
          budget: 200_000,
        },
      },
    },
  })
  @ApiOkResponse({ description: "Trip updated successfully" })
  async updateTrip(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.update(id, updateTripDto);
  }

  // PATCH /trips/:id/status - Update only trip status
  @Patch(":id/status")
  @ApiOperation({
    summary: "Update trip status",
    description: "Update only the status of a trip",
  })
  @ApiParam({ name: "id", description: "Trip ID", type: "number" })
  @ApiBody({
    type: UpdateTripStatusDto,
    description: "Trip status update data",
    examples: {
      example1: {
        summary: "Update status to active",
        value: {
          status: "ACTIVE",
        },
      },
      example2: {
        summary: "Update status to completed",
        value: {
          status: "COMPLETED",
        },
      },
    },
  })
  @ApiOkResponse({ description: "Trip status updated successfully" })
  async updateTripStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTripStatusDto: UpdateTripStatusDto,
  ) {
    return this.tripsService.updateStatus(id, updateTripStatusDto.status);
  }

  // DELETE /trips/:id - Delete trip
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete trip",
    description: "Delete a trip by its ID",
  })
  @ApiParam({ name: "id", description: "Trip ID", type: "number" })
  @ApiNoContentResponse({ description: "Trip deleted successfully" })
  async deleteTrip(@Param("id", ParseIntPipe) id: number) {
    await this.tripsService.remove(id);
  }

  // GET /trips/:id/summary - Get trip summary with totals
  @Get(":id/summary")
  @ApiOperation({
    summary: "Get trip summary",
    description: "Get trip summary with totals and statistics",
  })
  @ApiParam({ name: "id", description: "Trip ID", type: "number" })
  @ApiOkResponse({
    description: "Trip summary retrieved successfully",
    example: {
      trip: {
        id: 1,
        name: "Summer Vacation 2025",
        description: "A wonderful summer vacation to the mountains",
        status: "ACTIVE",
        startDate: "2025-07-01",
        endDate: "2025-07-15",
        budget: 150_000,
      },
      totalExpenses: 75_000,
      expensesByCategory: {
        ACCOMMODATION: 50_000,
        FOOD: 15_000,
        TRANSPORT: 10_000,
        ENTERTAINMENT: 0,
        OTHER: 0,
      },
      participantCount: 4,
      averageExpensePerParticipant: 18_750,
    },
  })
  async getTripSummary(@Param("id", ParseIntPipe) tripId: number) {
    return this.tripsService.getTripSummary(tripId);
  }
}
