import { compare } from "bcrypt";

import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
  private readonly tokenPrefix = "token_";

  constructor(private userService: UserService) {}

  generateToken(email: string): string {
    const ts = Date.now();
    const payload = `${email}::${String(ts)}`;
    const b64 = Buffer.from(payload, "utf8").toString("base64");
    return `${this.tokenPrefix}${b64}`;
  }

  async validateToken(token: string) {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new Error("Invalid token");
    }
    const b64 = token.slice(this.tokenPrefix.length);
    let payload: string;
    try {
      payload = Buffer.from(b64, "base64").toString("utf8");
    } catch {
      throw new Error("Invalid token");
    }
    const [email, tsString] = payload.split("::");
    const ts = Number(tsString);
    if (!email || Number.isNaN(ts)) {
      throw new Error("Invalid token");
    }

    const expiryMs = Number(process.env.EXPIRY_TIME_MS ?? "86400000");
    if (Date.now() - ts > expiryMs) {
      throw new Error("Token expired");
    }

    return await this.userService.findMetadataOrFail(email);
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmailOrFail(email);
    if (
      !user.isEnabled ||
      !(await compare(password, user.password).catch(() => false))
    ) {
      throw new UnauthorizedException();
    }
    return { token: this.generateToken(user.email) };
  }
}
