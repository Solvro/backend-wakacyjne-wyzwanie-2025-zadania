import { Role } from "@prisma/client";

import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Public, Roles } from "../auth/roles";
import { RolesGuard } from "../auth/roles.guard";
import { RegisterDto } from "./dto/register.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserMetadata } from "./dto/user-metadata";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "User registeration",
    description: "Create a new user account with email and password",
  })
  @ApiResponse({
    status: 201,
    description: "User registered successfully",
  })
  @ApiResponse({
    status: 409,
    description: "Conflict: User already exists",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @Public()
  async register(@Body() registerDto: RegisterDto) {
    const userExist = await this.userService.findOne(registerDto.email);
    if (userExist != null) {
      throw new ConflictException("User already exists");
    }
    const newUser = await this.userService.create(
      registerDto.email,
      registerDto.password,
    );
    return { email: newUser.email };
  }

  @Patch("role")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Update user role" })
  @ApiResponse({
    status: 201,
    description: "User role updates",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  async updateRole(@Body() dto: UpdateRoleDto) {
    const updatedUser = await this.userService.updateRole(dto.email, dto.role);
    return { email: updatedUser.email, role: updatedUser.role };
  }

  @Patch("")
  @ApiOperation({
    summary: "Update a user",
  })
  @ApiResponse({
    status: 200,
    description: "User updated",
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  @HttpCode(HttpStatus.OK)
  async update(
    @Request() request: { user: UserMetadata },
  ): Promise<UpdateUserDto> {
    return this.userService.updateUserData(request.user.email);
  }
}
