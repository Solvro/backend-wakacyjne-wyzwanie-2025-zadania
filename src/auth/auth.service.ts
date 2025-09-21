import { AuthRole, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { DatabaseService } from "../database/database.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserResponseDto } from "./dto/user-response.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
  ) {}

  private readonly saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 12);

  async register(dto: RegisterDto): Promise<UserResponseDto> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing !== null) {
      throw new ConflictException("Email already in use");
    }

    const passwordHash = await bcrypt.hash(dto.password, this.saltRounds);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: passwordHash, // hash zapisany w DB
          name: dto.name ?? null,
          role: AuthRole.USER, // poprawny enum
          isEnabled: true,
        },
        select: { email: true, name: true, role: true, isEnabled: true }, // nie zwracamy hasła
      });
      return user;
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException("Email already in use");
      }
      throw error;
    }
  }

  async signIn(dto: LoginDto): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (user == null) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const now = Date.now();
    // const expiry = now + Number(process.env.EXPIRY_TIME_MS);

    // payload do JWT
    const payload = {
      sub: user.email, // identyfikator użytkownika
      role: user.role, // rola (USER, COORDINATOR, ADMIN)
      iat: now,
      // exp: expiry,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return { token };
  }
}
