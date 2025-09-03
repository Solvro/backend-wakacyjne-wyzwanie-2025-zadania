import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @ApiOperation({ summary: "Get user by email" })
  @ApiResponse({
    status: 200,
    description: "User found.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  @Get(":email")
  async findOne(
    @Param("email") email: string,
  ): Promise<UserResponseDto | null> {
    return await this.service.findOne(email);
  }

  @ApiOperation({ summary: "Update user by email" })
  @ApiResponse({
    status: 200,
    description: "User updated successfully.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  @Patch(":email")
  async update(
    @Param("email") email: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.service.update(email, dto);
  }

  @ApiOperation({ summary: "Delete user by email" })
  @ApiResponse({
    status: 200,
    description: "User deleted successfully.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  @Delete(":email")
  async remove(@Param("email") email: string): Promise<UserResponseDto> {
    return await this.service.remove(email);
  }

  @ApiOperation({ summary: "Get all expenses created by a user" })
  @ApiResponse({
    status: 200,
    description: "List of expenses.",
    type: [ExpenseResponseDto],
  })
  @Get(":email/expenses")
  async getExpenses(
    @Param("email") email: string,
  ): Promise<ExpenseResponseDto[]> {
    return await this.service.getExpenses(email);
  }

  @ApiOperation({ summary: "Get all trips the user participates in" })
  @ApiResponse({
    status: 200,
    description: "List of trips.",
    type: [TripResponseDto],
  })
  @Get(":email/trips")
  async getTrips(@Param("email") email: string): Promise<TripResponseDto[]> {
    return await this.service.getTrips(email);
  }
}
