import {
  Body,
  Controller,
  ForbiddenException,
  Param,
  Patch,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UpdateUserDto } from "../auth/dto/update-user.dto";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(":email")
  @ApiOperation({ summary: "Edit a user" })
  @ApiResponse({ description: "Edits a user", type: String })
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
