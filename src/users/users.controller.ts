import { Role } from "@prisma/client";

import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/role/role.decorator";
import { RoleGuard } from "../auth/role/role.guard";
import { ExpenseResponseDto } from "../expenses/dto/expense-response.dto";
import { TripResponseDto } from "../trips/dto/trip-response.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "List of all users.",
    type: [UserResponseDto],
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
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
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
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
  @ApiResponse({
    status: 404,
    description: "User not found.",
  })
  @UseGuards(AuthGuard)
  @Patch(":email")
  async update(
    @Param("email") email: string,
    @Body() dto: UpdateUserDto,
    @Req() request: Request & { user: { email: string; role: Role } },
  ): Promise<UserResponseDto> {
    if (email !== request.user.email) {
      throw new ForbiddenException("You can only update your own user data");
    }

    return await this.service.update(email, dto);
  }

  @ApiOperation({ summary: "Delete user by email" })
  @ApiResponse({
    status: 200,
    description: "User deleted successfully.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
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
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
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
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Get(":email/trips")
  async getTrips(@Param("email") email: string): Promise<TripResponseDto[]> {
    return await this.service.getTrips(email);
  }
}
