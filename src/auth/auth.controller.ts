import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { Role } from "@/lib/roles";

import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import {
  LoginResponseDto,
  RequestWithUser,
  UpdateUserRolesDto,
  UserListResponseDto,
  UserLoginDto,
  UserRoleUpdateResponseDto,
  UserSignupDto,
} from "./dto/auth.dto";
import { Roles } from "./roles/role.decorator";
import { RoleGuard } from "./roles/role.guard";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiOperation({ description: "Register a new user" })
  @ApiOkResponse({ description: "User successfully registered" })
  async signup(@Body() userSignupDto: UserSignupDto) {
    return await this.authService.signup(userSignupDto);
  }

  @Post("login")
  @ApiOperation({ description: "Login user and get authentication token" })
  @ApiOkResponse({
    description: "User successfully logged in with token",
    type: LoginResponseDto,
  })
  async login(@Body() userLoginDto: UserLoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(userLoginDto);
  }

  @Put("users/roles")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN) // Admin role required
  @ApiOperation({ description: "Update user roles (Admin only)" })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "User roles successfully updated",
    type: UserRoleUpdateResponseDto,
  })
  async updateUserRoles(
    @Body() updateUserRolesDto: UpdateUserRolesDto,
    @Request() request: RequestWithUser,
  ): Promise<UserRoleUpdateResponseDto> {
    if (request.user === undefined) {
      throw new UnauthorizedException("User not authenticated");
    }
    return await this.authService.updateUserRoles(
      updateUserRolesDto,
      request.user,
    );
  }

  @Get("users")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN) // Admin role required
  @ApiOperation({ description: "Get all users (Admin only)" })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "List of all users retrieved successfully",
    type: [UserListResponseDto],
  })
  async getAllUsers(
    @Request() request: RequestWithUser,
  ): Promise<UserListResponseDto[]> {
    if (request.user === undefined) {
      throw new UnauthorizedException("User not authenticated");
    }
    return await this.authService.getAllUsers(request.user);
  }
}
