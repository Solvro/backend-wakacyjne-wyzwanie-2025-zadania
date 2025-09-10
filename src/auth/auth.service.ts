import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { compare } from "bcrypt";

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { UserMetadata } from "../user/dto/user-metadata";
import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  private readonly tokenPrefix = "token_";
  private readonly expiryTimeMs: number;

  constructor(
    private readonly database: DatabaseService,
    private readonly usersService: UserService,
  ) {
    this.expiryTimeMs = Number.parseInt(
      process.env.EXPIRY_TIME_MS ?? "10000",
      10,
    );
  }

  async register(dto: RegisterDto): Promise<void> {
    const existing = await this.database.user.findUnique({
      where: { email: dto.email },
    });
    if (existing !== null) {
      throw new ConflictException("Email already in use");
    }

    const password = await bcrypt.hash(dto.password, 12);

    await this.database.user.create({
      data: {
        email: dto.email,
        name: dto.name ?? null,
        password,
        UserRole: UserRole.USER,
        isEnabled: true,
      },
    });
  }

  async validateToken(token: string): Promise<UserMetadata | null> {
    if (!token.startsWith(this.tokenPrefix)) {
      return null;
    }

    const parts = token.slice(this.tokenPrefix.length).split("_");
    if (parts.length !== 2) {
      return null;
    }

    const timestamp = Number.parseInt(parts[0], 10);
    const email = parts[1];

    if (
      Number.isNaN(timestamp) ||
      typeof email !== "string" ||
      email.trim().length === 0
    ) {
      return null;
    }

    const now = Date.now();
    if (now - timestamp > this.expiryTimeMs) {
      return null;
    }

    return this.usersService.findMetadataOrFail(email);
  }

  generateToken(email: string): string {
    const timestamp = Date.now();
    return `${this.tokenPrefix}${timestamp.toString()}_${email}`;
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(email);
    if (
      user === null ||
      !user.isEnabled ||
      !(await compare(password, user.password).catch(() => false))
    ) {
      throw new UnauthorizedException();
    }
    return { token: this.generateToken(user.email) };
  }
}
