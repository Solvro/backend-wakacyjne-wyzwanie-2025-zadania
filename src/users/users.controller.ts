import { plainToInstance } from "class-transformer";

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { CurrentUser } from "../common/decorators/current-user.decorator";
import type { JwtUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private users: UsersService) {}

  @Get("me")
  @ApiOperation({ summary: "Dane zalogowanego użytkownika" })
  @ApiOkResponse({ type: UserResponseDto })
  async me(@CurrentUser() user: JwtUser) {
    const u = await this.users.findById(user.sub);
    return plainToInstance(UserResponseDto, u, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(":id")
  @ApiOperation({ summary: "Aktualizacja użytkownika (self lub admin)" })
  @ApiOkResponse({ type: UserResponseDto })
  async update(
    @CurrentUser() actor: JwtUser,
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const updated = await this.users.update(actor, id, dto);
    return plainToInstance(UserResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }
}
