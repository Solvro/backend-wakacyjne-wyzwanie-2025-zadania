import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/guards/auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UsersService } from "./users.service";

@Controller("user")
@ApiTags("users")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update user data",
    description:
      "Update user data. Regular users can only update their own data. Administrators can update any user data by providing email parameter.",
  })
  @ApiQuery({
    name: "email",
    required: false,
    description: "Email of user to update (admin only)",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "User data updated successfully",
    type: "UserResponseDto",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - insufficient permissions",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  async updateUser(
    @Request() req: any,
    @Query("email") targetEmail?: string,
    @Body() updateUserDto?: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateUser(
      req.user.email,
      req.user.role,
      targetEmail,
      updateUserDto || {},
    );
  }
}
