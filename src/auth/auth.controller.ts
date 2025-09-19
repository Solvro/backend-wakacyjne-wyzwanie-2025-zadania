import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginDto } from "./dto/login.dto";
import { Public } from "./roles";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "User login",
    description: "Authenticate user and return access token",
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials",
  })
  @ApiResponse({
    status: 200,
    description: "Login successful",
  })
  @Public()
  async signIn(@Body() signInDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
