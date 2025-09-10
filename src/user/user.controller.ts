import { Role } from "@prisma/client";

import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { UserUpdateResponseDto } from "./dto/update-user-response.dto";
import { UserUpdateDto } from "./dto/update-user.dto";
import { UserMetadata } from "./dto/user-metadata";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Patch(":email")
  @ApiParam({
    name: "email",
    description:
      "Email użytkownika do zaktualizowania (tylko ADMIN może edytować inne konta)",
    example: "user@example.com",
  })
  @ApiOperation({
    description:
      "Aktualizuje informacje przypisane do danego konta, w przypadku braku emaila, aktualizowane jest konto użytkownika",
  })
  @ApiOkResponse({
    description: "Użytkownik zaktualizowany",
  })
  @ApiUnauthorizedResponse({
    description: "Nie masz pozwoleń do edycji tego konta",
  })
  @ApiForbiddenResponse({
    description:
      "Nie masz pozwoleń do edycji tego konta - zwykły użytkownik może edytować tylko własne konto",
  })
  async updateUserData(
    @Param("email") emailParameter: string,
    @Request() request: { user: UserMetadata },
    @Body() updateRequest: UserUpdateDto,
  ): Promise<UserUpdateResponseDto> {
    const currentUser = request.user;

    if (
      currentUser.role !== Role.ADMIN &&
      emailParameter !== currentUser.email
    ) {
      throw new ForbiddenException("Nie możesz edytować tego konta");
    }

    return this.userService.updateUserData(
      emailParameter,
      updateRequest.newAboutMe,
      updateRequest.name,
    );
  }
}
