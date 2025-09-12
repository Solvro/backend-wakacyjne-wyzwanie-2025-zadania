import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

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
  async signIn(@Body() signInDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiOperation({
    summary: "Register a new user account",
  })
  @ApiResponse({
    status: 201,
    description: "Registered and logged in",
  })
  @ApiResponse({
    status: 409,
    description: "User with this email already exists",
  })
  @ApiResponse({
    status: 401,
    description: "Password confirmation does not match",
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  async register(@Body() registerDto: RegisterDto): Promise<LoginResponseDto> {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.passwordConfirmation,
      registerDto.name,
      registerDto.middleName,
      registerDto.lastName,
      registerDto.sex,
    );
  }
}
