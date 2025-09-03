import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { SignInResponseDto } from "./dto/sign-in-response.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { CustomTokenGuard } from "./guards/custom-token.guard";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "User registration",
    description: "Register a new user account",
  })
  @ApiResponse({
    status: 201,
    description: "User successfully registered",
  })
  @ApiResponse({
    status: 409,
    description: "Email or username already exists",
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "User login",
    description: "Authenticate user and return custom token",
  })
  @ApiResponse({
    status: 200,
    description: "Successful login",
    type: SignInResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials",
  })
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @UseGuards(CustomTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "User logout",
    description: "Invalidate user token",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully logged out",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  async logout(@Headers("authorization") authHeader: string) {
    const token = authHeader.replace("Bearer ", "");
    if (token) {
      await this.authService.logout(token);
    }
    return { message: "Successfully logged out" };
  }
}
