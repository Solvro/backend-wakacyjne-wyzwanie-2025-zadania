import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { AuthService } from "./auth.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginDto } from "./dto/login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiOperation({
    summary: "Log in",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Logged in",
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found",
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Invalid password",
  })
  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.service.login(loginDto);
  }

  @ApiOperation({
    summary: "Register",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Registered",
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "User with this email already exists",
  })
  @Post("register")
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.service.register(createUserDto);
  }
}
