import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";

import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CreateUserDto } from "./dto/create-dto.user";
import { ResponseUserDto } from "./dto/response-dto.user";
import { UserUpdateResponseDto } from "./dto/update-user-response.dto";
import { UserUpdateDto } from "./dto/update-user.dto";
import { UserMetadata } from "./dto/user-metadata";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Tworzy nowego użytkownika",
  })
  @ApiCreatedResponse({
    description: "Użytkonwik został stworzony poprawnie",
    type: ResponseUserDto,
  })
  @ApiConflictResponse({
    description: "Istnieje już użytkownik o podanym adresie email",
  })
  @ApiBadRequestResponse({
    description: "Invalid input data",
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

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
