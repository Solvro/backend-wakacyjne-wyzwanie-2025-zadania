import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { Public } from "../common/decorators/public.decorator";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserResponseDto } from "./dto/user-response.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Public()
  @Post("register")
  @ApiOperation({ summary: "Register" })
  @ApiOkResponse({
    description: "Registers a user/admin",
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  @ApiConflictResponse({ description: "User with this email already exists" })
  async register(@Body() dto: RegisterDto) {
    const user = await this.usersService.createUser(
      dto.email,
      dto.password,
      dto.name,
    );
    return { email: user.email, name: user.name };
  }

  @Public()
  @HttpCode(200)
  @Post("login")
  @ApiOperation({ summary: "Login" })
  @ApiOkResponse({ description: "Logins a user/admin", type: LoginResponseDto })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  @ApiUnauthorizedResponse({ description: "Invalid credentials" })
  async login(@Body() dto: LoginDto) {
    return this.authService.signIn(dto.email, dto.password);
  }
}
