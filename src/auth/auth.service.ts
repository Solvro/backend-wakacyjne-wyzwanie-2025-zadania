import * as bcrypt from "bcrypt";

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import {
  ROLES_NUMBER,
  generateRoleString,
  getUserRoles,
  setRole,
} from "@/lib/roles";

import { EXPIRY_TIME_MS } from "../config/config";
import { PrismaService } from "../prisma/prisma.service";
import { UserMetadata } from "../user/dto/user-metadata.dto";
import { UserService } from "../user/user.service";
import {
  LoginResponseDto,
  UpdateUserRolesDto,
  UserListResponseDto,
  UserLoginDto,
  UserRoleUpdateResponseDto,
  UserSignupDto,
} from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UserService,
  ) {}

  private readonly tokenPrefix = "token_";

  async signup(userSignupDto: UserSignupDto) {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        email: userSignupDto.email,
      },
    });

    if (existingUser !== null) {
      throw new ConflictException("A user with whis email already exists.");
    }

    const rolesString = generateRoleString(ROLES_NUMBER);
    const passwordHash = await bcrypt.hash(userSignupDto.password, 10);
    await this.prismaService.user.create({
      data: {
        email: userSignupDto.email,
        password: passwordHash,
        roles: rolesString,
      },
    });

    return {
      email: userSignupDto.email,
      roles: rolesString,
    };
  }

  async login(userLoginDto: UserLoginDto): Promise<LoginResponseDto> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: userLoginDto.email,
      },
    });

    if (user === null) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const token = this.generateToken(user.email);
    return {
      email: user.email,
      roles: user.roles,
      token,
      id: user.id,
    };
  }

  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new UnauthorizedException("Invalid token");
    }

    // Extract timestamp and email from token
    const tokenContent = token.slice(this.tokenPrefix.length);
    const [timestampString, email] = tokenContent.split(":");

    if (!timestampString || !email) {
      throw new UnauthorizedException("Invalid token format");
    }

    const timestamp = Number.parseInt(timestampString, 10);
    const currentTime = Date.now();

    // Check if token has expired
    if (currentTime - timestamp > EXPIRY_TIME_MS) {
      throw new UnauthorizedException("Token has expired");
    }

    return await this.usersService.findMetadataByEmailOrFail(email);
  }

  generateToken(email: string): string {
    const timestamp = Date.now();
    return `${this.tokenPrefix}${timestamp.toString()}:${email}`;
  }

  async updateUserRoles(
    updateUserRolesDto: UpdateUserRolesDto,
    adminUser: UserMetadata,
  ): Promise<UserRoleUpdateResponseDto> {
    // Check if the current user has admin privileges using the role utils
    const adminRoles = getUserRoles(adminUser.roles);
    const hasAdminRole = adminRoles.includes(0); // 0 is Role.ADMIN

    if (!hasAdminRole) {
      throw new ForbiddenException("Only administrators can manage user roles");
    }

    // Find the target user
    const targetUser = await this.prismaService.user.findUnique({
      where: { id: updateUserRolesDto.userId },
    });

    if (targetUser === null) {
      throw new NotFoundException(
        `User with ID ${updateUserRolesDto.userId.toString()} not found`,
      );
    }

    // Build new role string based on provided roles
    let newRoleString = generateRoleString(ROLES_NUMBER); // Start with all roles as '0'

    // Set the specified roles to '1'
    for (const roleId of updateUserRolesDto.roles) {
      newRoleString = setRole(newRoleString, roleId);
    }

    // Update the user's roles in the database
    const updatedUser = await this.prismaService.user.update({
      where: { id: updateUserRolesDto.userId },
      data: { roles: newRoleString },
    });

    // Get role names for response
    const activeRoles = getUserRoles(newRoleString);
    const roleNames = this.getRoleNames(activeRoles);

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      roles: updatedUser.roles,
      roleNames,
    };
  }

  private getRoleNames(roleIds: number[]): string[] {
    const roleNameMap: Record<number, string> = {
      0: "Administrator",
      1: "Moderator",
      2: "User",
      3: "Guest",
      4: "Trip Coordinator",
    };

    return roleIds.map((roleId) => roleNameMap[roleId] || "Unknown");
  }

  async getAllUsers(adminUser: UserMetadata): Promise<UserListResponseDto[]> {
    // Check if the current user has admin privileges
    const adminRoles = getUserRoles(adminUser.roles);
    const hasAdminRole = adminRoles.includes(0); // 0 is Role.ADMIN

    if (!hasAdminRole) {
      throw new ForbiddenException("Only administrators can view all users");
    }

    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        roles: true,
      },
    });

    return users.map((user) => {
      const activeRoles = getUserRoles(user.roles);
      const roleNames = this.getRoleNames(activeRoles);

      return {
        id: user.id,
        email: user.email,
        roles: user.roles,
        roleNames,
      };
    });
  }
}
