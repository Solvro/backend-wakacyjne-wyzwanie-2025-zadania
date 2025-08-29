import { Role } from "@prisma/client";

import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/role.guard";
import { UserMetadata } from "./dto/user-metadata";
import { UserUpdateResponseDto } from "./dto/user-update-response.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: "Update the personal data of a user",
  })
  @ApiResponse({
    status: 200,
    description: "Field(s) updated",
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch("")
  @ApiBearerAuth("access-token")
  async updateUserData(
    @Request() request: { user: UserMetadata },
    @Body() updateRequest: UserUpdateDto,
  ): Promise<UserUpdateResponseDto> {
    if (updateRequest.newAboutMe === null && updateRequest.name === null) {
      throw new Error("No fields to update");
    }

    updateRequest.email ??= request.user.email;

    if (
      request.user.role !== "ADMIN" &&
      updateRequest.email !== request.user.email
    ) {
      throw new ConflictException("Cannot update another user's data");
    }

    const updatedUser = await this.userService.updateUserData(
      updateRequest.email,
      updateRequest.newAboutMe,
      updateRequest.name,
    );

    return {
      email: updatedUser.email,
      name: updatedUser.name,
      about_me: updatedUser.about_me,
    };
  }

  @ApiOperation({
    summary: "Disable the given user account",
  })
  @ApiResponse({
    status: 204,
    description: "User disabled",
  })
  @ApiResponse({
    status: 400,
    description: "Cannot disable an admin account",
  })
  @ApiResponse({
    status: 403,
    description: "Missing privileges",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("disable/:email")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("access-token")
  async disableUser(@Param("email") email: string) {
    return this.userService.disableUser(email);
  }

  @ApiOperation({
    summary: "Enable the given user account",
  })
  @ApiResponse({
    status: 204,
    description: "User enabled",
  })
  @ApiResponse({
    status: 403,
    description: "Missing privileges",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  @UseGuards(AuthGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("enable/:email")
  @Roles(Role.ADMIN)
  @ApiBearerAuth("access-token")
  async enableUser(@Param("email") email: string) {
    return this.userService.enableUser(email);
  }

  @ApiOperation({
    summary: "Get the metadata of the current user",
  })
  @ApiResponse({
    status: 200,
    description: "User metadata retrieved successfully",
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @Get("me")
  async findMetadata(
    @Request() request: { user: UserMetadata },
  ): Promise<UserMetadata> {
    return this.userService.findMetadataOrFail(request.user.email);
  }
}
