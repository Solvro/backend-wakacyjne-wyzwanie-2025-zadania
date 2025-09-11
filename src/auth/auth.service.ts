import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "../../prisma/prisma.service";

interface TokenPayload {
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
  ): Promise<{ id: number; email: string; role: UserRole; createdAt: Date }> {
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists !== null) {
      throw new ConflictException("Konto o podanym adresie email już istnieje");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: { email, passwordHash, role: UserRole.USER },
      select: { id: true, email: true, role: true, createdAt: true },
    });

    return user;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user === null) {
      throw new UnauthorizedException("Nieprawidłowe dane logowania");
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException("Nieprawidłowe dane logowania");
    }

    const payload: TokenPayload = { role: user.role };
    const accessToken = this.jwt.sign(payload, { subject: String(user.id) });

    return { accessToken };
  }
}
