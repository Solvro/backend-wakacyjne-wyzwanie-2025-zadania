import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { UserMetadata } from "./dto/user-metadata";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":email")
  @ApiOperation({ summary: "Find user by email" })
  @ApiResponse({ status: 200, description: "User found" })
  @ApiResponse({ status: 404, description: "User not found" })
  async findOne(@Param("email") email: string): Promise<User> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Get(":email/metadata")
  @ApiOperation({ summary: "Find user metadata by email" })
  @ApiResponse({ status: 200, description: "User metadata found" })
  @ApiResponse({ status: 404, description: "User not found" })
  async findMetadata(@Param("email") email: string): Promise<UserMetadata> {
    return this.userService.findMetadataOrFail(email);
  }
}
