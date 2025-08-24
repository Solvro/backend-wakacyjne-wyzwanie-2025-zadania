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

import { CreateExpenseDto } from "../expenses/dto/expense.dto";
import { ExpensesService } from "../expenses/expenses.service";
import { CreateParticipantDto } from "../participants/dto/participant.dto";
import { ParticipantsService } from "../participants/participants.service";
import type {
  CreateTripDto,
  UpdateTripDto,
  UpdateTripStatusDto,
} from "./dto/trip.dto";
import { TripsService } from "./trips.service";

@Controller("trips")
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private readonly participantsService: ParticipantsService,
    private readonly expensesService: ExpensesService,
  ) {}

  // GET /trips - Get all trips
  @Get()
  async getAllTrips() {
    return this.tripsService.findAll();
  }

  // GET /trips/:id - Get trip by ID
  @Get(":id")
  async getTripById(@Param("id", ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  // POST /trips - Create new trip
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrip(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  // PUT /trips/:id - Update entire trip
  @Put(":id")
  async updateTrip(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.update(id, updateTripDto);
  }

  // PATCH /trips/:id/status - Update only trip status
  @Patch(":id/status")
  async updateTripStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTripStatusDto: UpdateTripStatusDto,
  ) {
    return this.tripsService.updateStatus(id, updateTripStatusDto.status);
  }

  // DELETE /trips/:id - Delete trip
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrip(@Param("id", ParseIntPipe) id: number) {
    await this.tripsService.remove(id);
  }

  // GET /trips/:id/participants - Get all participants for a trip
  @Get(":id/participants")
  async getTripParticipants(@Param("id", ParseIntPipe) tripId: number) {
    return this.tripsService.getTripParticipants(tripId);
  }

  // POST /trips/:id/participants - Add participant to trip
  @Post(":id/participants")
  @HttpCode(HttpStatus.CREATED)
  async addParticipant(
    @Param("id", ParseIntPipe) tripId: number,
    @Body() createParticipantDto: CreateParticipantDto,
  ) {
    return this.participantsService.addParticipantToTrip(
      tripId,
      createParticipantDto,
    );
  }

  // GET /trips/:id/expenses - Get all expenses for a trip
  @Get(":id/expenses")
  async getTripExpenses(@Param("id", ParseIntPipe) tripId: number) {
    return this.tripsService.getTripExpenses(tripId);
  }

  // POST /trips/:id/expenses - Add expense to trip
  @Post(":id/expenses")
  @HttpCode(HttpStatus.CREATED)
  async addExpense(
    @Param("id", ParseIntPipe) tripId: number,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.expensesService.addExpenseToTrip(tripId, createExpenseDto);
  }

  // GET /trips/:id/summary - Get trip summary with totals
  @Get(":id/summary")
  async getTripSummary(@Param("id", ParseIntPipe) tripId: number) {
    return this.tripsService.getTripSummary(tripId);
  }
}
