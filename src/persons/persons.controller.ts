import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ExpenseResponseDto } from "../expenses/dto/expense-response.dto";
import { TripResponseDto } from "../trips/dto/trip-response.dto";
import { CreatePersonDto } from "./dto/create-person.dto";
import { PersonResponseDto } from "./dto/person-response.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { PersonsService } from "./persons.service";

@ApiTags("persons")
@Controller("persons")
export class PersonsController {
  constructor(private readonly service: PersonsService) {}

  @ApiOperation({ summary: "Create a new person" })
  @ApiResponse({
    status: 201,
    description: "Person created successfully.",
    type: PersonResponseDto,
  })
  @Post()
  async create(@Body() dto: CreatePersonDto): Promise<PersonResponseDto> {
    return await this.service.create(dto);
  }

  @ApiOperation({ summary: "Get all people" })
  @ApiResponse({
    status: 200,
    description: "List of all people.",
    type: [PersonResponseDto],
  })
  @Get()
  async findAll(): Promise<PersonResponseDto[]> {
    return await this.service.findAll();
  }

  @ApiOperation({ summary: "Get person by ID" })
  @ApiResponse({
    status: 200,
    description: "Person found.",
    type: PersonResponseDto,
  })
  @ApiResponse({ status: 404, description: "Person not found." })
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PersonResponseDto | null> {
    return await this.service.findOne(id);
  }

  @ApiOperation({ summary: "Update person by ID" })
  @ApiResponse({
    status: 200,
    description: "Person updated successfully.",
    type: PersonResponseDto,
  })
  @ApiResponse({ status: 404, description: "Person not found." })
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePersonDto,
  ): Promise<PersonResponseDto> {
    return await this.service.update(id, dto);
  }

  @ApiOperation({ summary: "Delete person by ID" })
  @ApiResponse({
    status: 200,
    description: "Person deleted successfully.",
    type: PersonResponseDto,
  })
  @ApiResponse({ status: 404, description: "Person not found." })
  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PersonResponseDto> {
    return await this.service.remove(id);
  }

  @ApiOperation({ summary: "Get all expenses created by a person" })
  @ApiResponse({
    status: 200,
    description: "List of expenses.",
    type: [ExpenseResponseDto],
  })
  @Get(":id/expenses")
  async getExpenses(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ExpenseResponseDto[]> {
    return await this.service.getExpenses(id);
  }

  @ApiOperation({ summary: "Get all trips the person participates in" })
  @ApiResponse({
    status: 200,
    description: "List of trips.",
    type: [TripResponseDto],
  })
  @Get(":id/trips")
  async getTrips(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<TripResponseDto[]> {
    return await this.service.getTrips(id);
  }
}
