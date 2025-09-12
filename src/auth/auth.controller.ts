import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    description: "Account created",
  })
  @ApiResponse({
    status: 409,
    description: "User with the given email already exists",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid request data",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  async signUp(@Body() signUpDto: RegisterDto): Promise<LoginResponseDto> {
    return this.authService.signUp({
      email: signUpDto.email,
      password: signUpDto.password,
    });
  }
}
