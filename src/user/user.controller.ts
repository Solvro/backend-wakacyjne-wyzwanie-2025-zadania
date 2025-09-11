import {
  Body,
  Controller,
  ForbiddenException,
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
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(":email")
  @ApiOperation({ summary: "Edit a user" })
  @ApiOkResponse({ description: "User updated successfully" })
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
    if (currentUser.role === "ADMIN") {
      return this.userService.updateUser(email, dto);
    }

    if (currentUser.email !== email) {
      throw new ForbiddenException("You can only modify your own data");
    }

    if ("role" in dto && dto.role !== currentUser.role) {
      throw new ForbiddenException("Cannot change your role");
    }

    return this.userService.updateUser(email, dto);
  }
}
