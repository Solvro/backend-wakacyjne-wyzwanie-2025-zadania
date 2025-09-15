import { Role } from "@prisma/client";

import {
  Body,
  Controller,
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
import { UserMetadata } from "./dto/user-metadata.dto";
import { UserUpdateResponseDto } from "./dto/user-update-response.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { UsersService } from "./users.service";

@Controller("users")
@ApiTags("users")
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: "Update user's personal data",
  })
  @ApiResponse({
    status: 200,
    description: "User data updated",
  })
  @HttpCode(HttpStatus.OK)
  @Patch("")
  @UseGuards(AuthGuard)
  async updateUserData(
    @Request() request: { user: UserMetadata },
    @Body() updateRequest: UserUpdateDto,
  ): Promise<UserUpdateResponseDto> {
    return this.usersService.updateUserData(
      request.user,
      updateRequest.newName,
      updateRequest.newAboutMe,
      updateRequest.targetEmail,
    );
  }

  @ApiOperation({
    summary: "Disable user account",
  })
  @ApiResponse({
    status: 204,
    description: "User account disabled",
  })
  @ApiResponse({
    status: 400,
    description: "Cannot disable an admin account",
  })
  @ApiResponse({
    status: 403,
    description: "Missing user permissions",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/disable/:email")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async disableUser(@Param("email") email: string) {
    return this.usersService.disableAccount(email);
  }

  @ApiOperation({
    summary: "Enable user account",
  })
  @ApiResponse({
    status: 204,
    description: "User account enabled",
  })
  @ApiResponse({
    status: 403,
    description: "Missing user permissions",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/enable/:email")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async enableUser(@Param("email") email: string) {
    return this.usersService.enableAccount(email);
  }
}
