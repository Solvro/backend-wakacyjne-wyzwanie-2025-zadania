import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { Public } from "../common/decorators/public.decorator";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post("register")
  @ApiOperation({ summary: "Rejestracja użytkownika" })
  @ApiCreatedResponse({ description: "Utworzono użytkownika" })
  @ApiConflictResponse({ description: "Email już zajęty" })
  @ApiBadRequestResponse({ description: "Walidacja nie przeszła" })
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto.email, dto.password);
  }

  @Public()
  @Post("login")
  @HttpCode(200)
  @ApiOperation({ summary: "Logowanie" })
  @ApiOkResponse({ description: "Zwraca JWT z iat/exp w payloadzie" })
  @ApiUnauthorizedResponse({ description: "Błędne dane logowania" })
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }
}
