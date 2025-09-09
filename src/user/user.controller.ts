import { Role, User } from "@prisma/client";
import { Request as ExpressRequest } from "express";

import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { EmailParameterDto } from "../validators/email-parameter.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserMetadata } from "./dto/user-metadata";
import { UserService } from "./user.service";

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    email: string;
    role: Role;
    name?: string | null;
    isEnabled: boolean;
  };
}

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  private checkUserAccess(
    currentUser: { email: string; role: Role },
    targetEmail: string,
  ): void {
    const isOwnData = currentUser.email === targetEmail;
    const isAdmin = currentUser.role === Role.ADMIN;

    if (!isOwnData && !isAdmin) {
      throw new ForbiddenException("You can only access your own data");
    }
  }

  @UseGuards(AuthGuard)
  @Get(":email")
  @ApiOperation({
    summary: "Find user by email",
    description:
      "Users can view their own data. Administrators can view any user's data.",
  })
  @ApiParam({
    name: "email",
    description: "User email address",
    example: "user@example.com",
  })
  @ApiResponse({ status: 200, description: "User found" })
  @ApiResponse({ status: 400, description: "Invalid email format" })
  @ApiResponse({
    status: 403,
    description: "Forbidden - can only view own data",
  })
  @ApiResponse({ status: 404, description: "User not found" })
  async findOne(
    @Param() parameters: EmailParameterDto,
    @Request() request: AuthenticatedRequest,
  ): Promise<User> {
    this.checkUserAccess(request.user, parameters.email);

    const user = await this.userService.findOne(parameters.email);
    if (user === null) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Get(":email/metadata")
  @ApiOperation({
    summary: "Find user metadata by email",
    description:
      "Users can view their own metadata. Administrators can view any user's metadata.",
  })
  @ApiParam({
    name: "email",
    description: "User email address",
    example: "user@example.com",
  })
  @ApiResponse({ status: 200, description: "User metadata found" })
  @ApiResponse({ status: 400, description: "Invalid email format" })
  @ApiResponse({
    status: 403,
    description: "Forbidden - can only view own data",
  })
  @ApiResponse({ status: 404, description: "User not found" })
  async findMetadata(
    @Param() parameters: EmailParameterDto,
    @Request() request: AuthenticatedRequest,
  ): Promise<UserMetadata> {
    this.checkUserAccess(request.user, parameters.email);

    return this.userService.findMetadataOrFail(parameters.email);
  }

  @UseGuards(AuthGuard)
  @Patch(":email")
  @ApiOperation({
    summary: "Update user data",
    description:
      "Users can update their own data. Administrators can update any user's data.",
  })
  @ApiParam({
    name: "email",
    description: "User email address",
    example: "user@example.com",
  })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @ApiResponse({
    status: 400,
    description: "Invalid input data or email format",
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "User not found" })
  async update(
    @Param() parameters: EmailParameterDto,
    @Body() updateUserDto: UpdateUserDto,
    @Request() request: AuthenticatedRequest,
  ): Promise<User> {
    const currentUser = request.user;

    this.checkUserAccess(currentUser, parameters.email);

    if (updateUserDto.role !== undefined && currentUser.role !== Role.ADMIN) {
      throw new ForbiddenException("Only administrators can modify user roles");
    }

    return this.userService.update(parameters.email, updateUserDto);
  }
}
