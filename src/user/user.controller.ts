import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles/roles.decorator";
import { RoleGuard } from "src/auth/roles/roles.guard";

import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

import { CurrentUser } from "../auth/roles/current-user";
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
    status: HttpStatus.CREATED,
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
    status: HttpStatus.OK,
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
    status: HttpStatus.OK,
    description: "User details retrieved successfully",
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found",
  })
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Update user details",
    description: "Modify information for an existing user",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User updated successfully",
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found",
  })
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: { id: string; role: Role },
  ) {
    if (currentUser.role !== Role.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException("You can only update your own profile");
    }

    return this.userService.update(id, updateUserDto);
  }

  @Delete(":email")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Delete a user",
    description: "Remove a user and all its associated data from the system",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found",
  })
  async remove(@Param("email") email: string) {
    return this.userService.remove(email);
  }

  @Patch("enable/:email")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Enable a user",
    description: "Enable a user to be used",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User enabled successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found",
  })
  async enableUser(@Param("email") email: string) {
    return this.userService.enableUser(email);
  }

  @Patch("disable/:email")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Disable a user",
    description: "Disable a user",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User disabled successfully",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Cannot disable an admin account",
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Missing privileges",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found",
  })
  async disableUser(@Param("email") email: string) {
    return this.userService.disableUser(email);
  }
}
