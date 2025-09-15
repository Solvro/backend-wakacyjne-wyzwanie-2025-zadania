import * as bcrypt from "bcrypt";

import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UserMetadata } from "../user/dto/user-metadata";
import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RegisterResponseDto } from "./dto/register-response.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(readonly userService: UserService) {}

  private static readonly EXPIRY_TIME_MS = Number.parseInt(
    process.env.EXPIRY_TIME_MS ?? "3600000",
  );

  private readonly tokenPrefix = "token_";

  private generateToken(email: string): string {
    const issuedAt = Date.now(); // timestamp w ms
    return `${this.tokenPrefix}${email}_${issuedAt.toString()}`;
  }

  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new Error("Invalid token format");
    }
    const parts = token.slice(this.tokenPrefix.length).split("_");
    if (parts.length !== 2) {
      throw new Error("Invalid token format");
    }
    const [email, issuedAtString] = parts;
    if (!email || !issuedAtString) {
      throw new Error("Invalid token format");
    }
    const issuedAt = Number(issuedAtString);

    const now = Date.now();
    if (now - issuedAt > AuthService.EXPIRY_TIME_MS) {
      throw new Error("Token has expired");
    }

    return this.userService.findMetadataOrFail(email).catch(() => {
      throw new UnauthorizedException("Invalid token: user not found");
    });
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findOne(email);

    if (
      user === null ||
      !user.is_enabled ||
      !(await bcrypt.compare(password, user.password).catch(() => false))
    ) {
      throw new UnauthorizedException();
    }
    return { accessToken: this.generateToken(user.email) };
  }

  async signUp(userData: RegisterDto): Promise<RegisterResponseDto> {
    const user = await this.userService.createUser(
      userData.email,
      userData.password,
    );
    return { accessToken: this.generateToken(user.email) };
  }
}
