import { compare } from "bcrypt";

import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UserMetadata } from "../user/dto/user-metadata";
import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  private readonly tokenPrefix = "token_";

  private static getExpiryMs(): number {
    const v = Number(process.env.EXPIRY_TIME_MS);
    return Number.isFinite(v) && v > 0 ? v : 3_600_000;
  }
  private readonly expiryMs: number = AuthService.getExpiryMs();

  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new UnauthorizedException("Invalid token");
    }

    const rest = token.slice(this.tokenPrefix.length);
    const lastUnderscore = rest.lastIndexOf("_");
    if (lastUnderscore === -1) {
      throw new UnauthorizedException("Invalid token format");
    }

    const encodedEmail = rest.slice(0, lastUnderscore);
    const iatString = rest.slice(lastUnderscore + 1);
    const iat = Number(iatString);
    if (!Number.isFinite(iat)) {
      throw new UnauthorizedException("Invalid token timestamp");
    }

    const now = Date.now();
    if (now - iat > this.expiryMs) {
      throw new UnauthorizedException("Token expired");
    }

    let email: string;
    try {
      email = decodeURIComponent(encodedEmail);
    } catch {
      throw new UnauthorizedException("Invalid token email encoding");
    }

    return this.userService.findMetadataOrFail(email);
  }

  generateToken(email: string): string {
    const iat = Date.now();
    const encoded = encodeURIComponent(email);
    return `${this.tokenPrefix}${encoded}_${String(iat)}`;
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findOne(email);
    if (
      user === null ||
      !(await compare(password, user.password).catch(() => false))
    ) {
      throw new UnauthorizedException();
    }

    const access_token = this.generateToken(user.email);
    const issued_at = Date.now();
    const expires_at = issued_at + this.expiryMs;

    return { access_token, issued_at, expires_at };
  }
}
