import { AuthRole, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { ConflictException, Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { RegisterDto } from "./dto/register.dto";
import { UserResponseDto } from "./dto/user-response.dto";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: DatabaseService) {}

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
}
