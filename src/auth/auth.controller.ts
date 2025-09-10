import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateUserDto } from "../user/dto/create-dto.user";
import { ResponseUserDto } from "../user/dto/response-dto.user";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/login-request.dto";
import { LoginResponseDto } from "./dto/login-response.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({
    summary: "Log in with an existing account",
  })
  @ApiResponse({
    status: 200,
    description: "Logged in",
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials or account disabled",
  })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() signInDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Post("signup")
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
    return this.authService.createUser(createUserDto);
  }
}
