import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "Log in with an existing account",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully logged in",
  })
  @ApiResponse({
    status: 401,
    description: "Provided credentials are invalid or account is disabled",
  })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @ApiOperation({
    summary: "Register a new account",
  })
  @ApiResponse({
    status: 201,
    description: "Successfully registered a new account",
  })
  @ApiResponse({
    status: 409,
    description: "User with given email already exists",
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  async register(@Body() registerDto: RegisterDto): Promise<LoginResponseDto> {
    return this.authService.register(registerDto);
  }
}
