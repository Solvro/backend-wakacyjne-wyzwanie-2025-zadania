import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Log in as user",
    description: "Searche for user and check if login credentials are correct",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Logged in successfully",
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found (register first)",
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Wrong password was given or account disabled",
  })
  async singIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto.email, loginUserDto.password);
  }

  @Post("register")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Register a new user",
    description: "Add a new user to the db",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Registered successfully",
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "There is already a user with this email",
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
