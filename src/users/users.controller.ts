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
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: 201,
    description: "User created successfully.",
    type: UserResponseDto,
  })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return await this.service.create(dto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "List of all users.",
    type: [UserResponseDto],
  })
  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return await this.service.findAll();
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({
    status: 200,
    description: "User found.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<UserResponseDto | null> {
    return await this.service.findOne(id);
  }

  @ApiOperation({ summary: "Update user by ID" })
  @ApiResponse({
    status: 200,
    description: "User updated successfully.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.service.update(id, dto);
  }

  @ApiOperation({ summary: "Delete user by ID" })
  @ApiResponse({
    status: 200,
    description: "User deleted successfully.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return await this.service.remove(id);
  }

  @ApiOperation({ summary: "Get all expenses created by a user" })
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

  @ApiOperation({ summary: "Get all trips the user participates in" })
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
