import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Register a new user",
    description:
      "Creates a new user account with email, password and name. Password is automatically hashed before storage.",
  })
  @ApiBody({
    type: RegisterDto,
    description: "User registration data",
  })
  @ApiResponse({
    status: 201,
    description: "User successfully created",
    schema: {
      example: {
        id: 1,
        email: "jan.kowalski@example.com",
        name: "Jan Kowalski",
        role: "USER",
      },
    },
  })
  @ApiConflictResponse({
    description: "User with this email already exists",
    schema: {
      example: {
        statusCode: 409,
        message: "User with this email already exists",
        error: "Conflict",
      },
    },
  })
  @ApiBadRequestResponse({
    description: "Invalid input data",
    schema: {
      example: {
        statusCode: 400,
        message: [
          "email must be an email",
          "Password must be at least 8 characters long",
        ],
        error: "Bad Request",
      },
    },
  })
  async register(@Body() registerDto: RegisterDto) {
    const existingUser = await this.authService.findUserByEmail(
      registerDto.email,
    );
    if (existingUser !== null) {
      throw new ConflictException("User with this email already exists");
    }
    const { password, ...result } =
      await this.authService.register(registerDto);
    return result;
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Login user",
    description: "Authenticates user and returns JWT token",
  })
  @ApiBody({
    type: LoginDto,
    description: "User login credentials",
  })
  @ApiResponse({
    status: 200,
    description: "User successfully authenticated",
    schema: {
      example: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: 1,
          email: "jan.kowalski@example.com",
          name: "Jan Kowalski",
          role: "USER",
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Invalid credentials",
    schema: {
      example: {
        statusCode: 401,
        message: "Invalid credentials",
        error: "Unauthorized",
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
