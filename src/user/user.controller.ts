import { AuthRole, User } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/roles/roles.guard";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Roles } from "../auth/roles/roles.decorator";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("api/v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of users returned" })
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(":email")
  @ApiOperation({ summary: "Get a user by email" })
  @ApiParam({ name: "email", type: String, description: "User email" })
  @ApiResponse({ status: 200, description: "User found" })
  @ApiResponse({ status: 404, description: "User not found" })
  async getOne(@Param("email") email: string): Promise<User> {
    return this.userService.getOne(email);
  }

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Patch(":email")
  @ApiOperation({ summary: "Update a user by email" })
  @ApiParam({ name: "email", type: String, description: "User email" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  @UseGuards(AuthGuard)
  async update(
    @Param("email") email: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(email, dto);
  }

  @Delete(":email")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a user by email" })
  @ApiParam({ name: "email", type: String, description: "User email" })
  @ApiResponse({ status: 204, description: "User deleted successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(AuthRole.ADMIN)
  async delete(@Param("email") email: string): Promise<void> {
    return this.userService.delete(email);
  }

  @Post("enable/:email")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Enable a user by email" })
  @ApiParam({ name: "email", type: String, description: "User email" })
  @ApiResponse({ status: 204, description: "User enabled successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(AuthRole.ADMIN)
  async enableAccount(@Param("email") email: string) {
    return this.userService.enableAccount(email);
  }

  @Post("disable/:email")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Disable a user by email" })
  @ApiParam({ name: "email", type: String, description: "User email" })
  @ApiResponse({ status: 204, description: "User disabled successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(AuthRole.ADMIN)
  async disableAccount(@Param("email") email: string) {
    return this.userService.disableAccount(email);
  }
}
