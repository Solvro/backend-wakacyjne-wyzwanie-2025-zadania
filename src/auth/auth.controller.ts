import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "src/user/dto/register-user.dto";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

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
    description: "No permision or account disabled",
  })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiOperation({
    summary: "Register account",
  })
  @ApiResponse({
    status: 201,
    description: "Registered",
  })
  @ApiResponse({
    status: 401,
    description: "No permision or account disabled",
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  async registerAuth(@Body() registerUser: RegisterUserDto) {
    return this.authService.registerAuth(registerUser);
  }
}
