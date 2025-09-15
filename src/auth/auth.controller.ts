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
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
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
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }
    const { password, ...result } =
      await this.authService.register(registerDto);
    return result;
  }
}
