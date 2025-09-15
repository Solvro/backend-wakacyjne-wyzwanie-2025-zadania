import { Role } from "@prisma/client";

import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { UpdateUserDto } from "../auth/dto/update-user.dto";
import { UserResponseDto } from "../auth/dto/user-response.dto";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Get all users with roles" })
  @ApiOkResponse({
    description: "Gets all users with roles",
    type: [UserResponseDto],
  })
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Patch(":email")
  @ApiOperation({ summary: "Edit a user" })
  @ApiOkResponse({
    description: "User updated successfully",
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({ description: "User with given email not found" })
  @ApiForbiddenResponse({
    description: "You are not allowed to update this user",
  })
  @ApiBadRequestResponse({ description: "Validation failed" })
  async updateUser(
    @Param("email") email: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() currentUser: { email: string; role: string },
  ) {
    if (currentUser.role === Role.ADMIN) {
      return this.userService.updateUser(email, dto);
    }

    if (currentUser.email !== email) {
      throw new ForbiddenException("You can only modify your own data");
    }

    if (dto.role !== undefined && dto.role !== currentUser.role) {
      throw new ForbiddenException("Cannot change your role");
    }

    return this.userService.updateUser(email, dto);
  }
}
