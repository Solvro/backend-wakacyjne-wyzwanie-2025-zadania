import * as bcrypt from "bcrypt";

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(email: string, password: string) {
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists !== null) {
      throw new ConflictException("Konto o podanym adresie email już istnieje");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await this.prisma.user.create({
      data: { email, passwordHash, role: "USER" },
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user === null) {
      throw new UnauthorizedException("Nieprawidłowe dane logowania");
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException("Nieprawidłowe dane logowania");
    }

    const nowSec = Math.floor(Date.now() / 1000);
    const expMs = Number(
      this.config.get<string>("EXPIRY_TIME_MS") ?? 3_600_000,
    );
    const expSec = nowSec + Math.floor(expMs / 1000);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: nowSec,
      exp: expSec,
    };
    const token = this.jwt.sign(payload, {
      secret: this.config.get<string>("JWT_SECRET") ?? "",
    });
    return { accessToken: token };
  }
}
