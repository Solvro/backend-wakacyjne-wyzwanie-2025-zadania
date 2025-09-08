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

import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { CustomTokenGuard } from "../auth/guards/custom-token.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UserService } from "./user.service";

interface CurrentUserType {
  id: number;
  role: string;
}

@Controller("user")
@ApiTags("user")
@UseGuards(CustomTokenGuard, RolesGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create user",
    description: "Creates a new user (Admin only)",
  })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully created.",
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: "Email or username already exists.",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Admin access required.",
  })
  @Roles("admin")
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all users",
    description: "Retrieves a list of all users (Admin only)",
  })
  @ApiResponse({
    status: 200,
    description: "The list of users has been successfully retrieved.",
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Admin access required.",
  })
  @Roles("admin")
  async findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get user by ID",
    description: "Retrieves a user by their ID (Owner or Admin)",
  })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully retrieved.",
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "User not found.",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Access denied.",
  })
  async findOne(
    @Param("id") id: string,
    @CurrentUser() currentUser: CurrentUserType,
  ) {
    const userId = +id;

    if (currentUser.id !== userId && currentUser.role !== "admin") {
      throw new ForbiddenException("Access denied");
    }

    return this.userService.findOne(userId);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update user by ID",
    description: "Updates a user by their ID (Owner or Admin)",
  })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully updated.",
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "User not found.",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Access denied.",
  })
  @ApiResponse({
    status: 409,
    description: "Email or username already exists.",
  })
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: CurrentUserType,
  ) {
    return this.userService.update(+id, updateUserDto, currentUser);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete user by ID",
    description: "Deletes a user by their ID (Owner or Admin)",
  })
  @ApiResponse({
    status: 204,
    description: "The user has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "User not found.",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - Access denied.",
  })
  async remove(
    @Param("id") id: string,
    @CurrentUser() currentUser: CurrentUserType,
  ) {
    return this.userService.remove(+id, currentUser);
  }
}
