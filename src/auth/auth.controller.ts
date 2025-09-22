import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-auth.dto";
import { LoginResponseDto } from "./dto/response-auth.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "Log in",
  })
  @ApiResponse({
    status: 200,
    description: "Logged in",
  })
  @ApiResponse({
    status: 401,
    description: "Bad login",
  })
  @ApiResponse({
    status: 403,
    description: "No permission to login",
  })
  @HttpCode(HttpStatus.OK)
  @Post("login")


  async signIn(@Body() signInDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }



  @ApiOperation({
    description: "Add new User",
  })
  @ApiResponse({
    description: "User registered",
  })
  @ApiResponse({
    status: 409,
    description: "User already exists",
  })
  @ApiResponse({
    status: 500,
    description: "User could not be created",
  })
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
