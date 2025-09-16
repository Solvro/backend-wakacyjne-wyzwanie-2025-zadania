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
  UnauthorizedException,
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
import { UserUpdateDto } from "./dto/update-user.dto";
import { UserMetadata } from "./dto/user-metadata";
import { UserUpdateResponseDto } from "./dto/user-update-response.dto";
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(":email")
  async updateUserData(
    @Param("email") email: string,
    @Request()
    request: {
      user: UserMetadata;
    },
    @Body() updateRequest: UserUpdateDto,
  ): Promise<UserUpdateResponseDto> {
    if (request.user.email !== email && request.user.role !== Role.ADMIN) {
      throw new UnauthorizedException("You can only update your own data");
    }
    return this.userService.updateUserData(
      email,
      updateRequest.name,
      updateRequest.middleName,
      updateRequest.lastName,
    );
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
  @UseGuards(AuthGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("disable/:email")
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  async disableUser(@Param("email") email: string) {
    return this.userService.disableAccount(email);
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
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  async enableUser(@Param("email") email: string) {
    return this.userService.enableAccount(email);
  }
}
