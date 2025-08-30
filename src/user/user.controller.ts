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
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserResponseDto } from "./dto/create-user-response.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a user",
    description: "Add a user to which you can add new participant",
  })
  @ApiResponse({
    status: 201,
    description: "User created",
    type: CreateUserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all users",
    description: "Retrieve a list of all users in the system",
  })
  @ApiResponse({
    status: 200,
    description: "List of users retrieved successfully",
    type: [CreateUserResponseDto],
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get user by ID",
    description: "Retrieve detailed information about a specific user",
  })
  @ApiResponse({
    status: 200,
    description: "User details retrieved successfully",
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update user details",
    description: "Modify information for an existing user",
  })
  @ApiResponse({
    status: 200,
    description: "User updated successfully",
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a user",
    description: "Remove a user and all its associated data from the system",
  })
  @ApiResponse({
    status: 200,
    description: "User deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  async remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
