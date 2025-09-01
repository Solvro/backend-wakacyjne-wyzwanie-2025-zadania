import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { Role } from "@/lib/roles";

import { AuthGuard } from "../auth/auth.guard";
import { RequestWithUser } from "../auth/dto/auth.dto";
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/role.guard";
import { UserMetadata } from "./dto/user-metadata.dto";
import { UpdateUserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ description: "Get user metadata by ID" })
  @ApiOkResponse({ description: "User metadata retrieved successfully" })
  async getUser(@Param("id") id: string): Promise<UserMetadata> {
    return await this.userService.findMetadataOrFail(id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ description: "Update user metadata by ID" })
  @ApiOkResponse({ description: "User metadata updated successfully" })
  async updateUser(
    @Param("id") id: string,
    @Body() body: UpdateUserDto,
    @Request() request: RequestWithUser,
  ) {
    const currentUser = request.user;

    if (currentUser === undefined) {
      throw new ForbiddenException("User not authenticated");
    }

    return await this.userService.updateUserWithAuthorization(
      id,
      body,
      currentUser,
    );
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ description: "Delete user by ID" })
  @ApiOkResponse({ description: "User deleted successfully" })
  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return await this.userService.deleteUser(id);
  }
}
