import { Body, Controller, Param, Patch, Req, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import * as jwtPayloadInterface from "../common/interfaces/jwt-payload.interface";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(":email")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user data" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  async update(
    @Param("email") email: string,
    @Body() dto: UpdateUserDto,
    @Req() request: jwtPayloadInterface.RequestWithUser,
  ) {
    if (request.user == null) {
      throw new Error("Authenticated user not found in request");
    }
    return this.userService.updateUser(email, dto, request.user);
  }
}
