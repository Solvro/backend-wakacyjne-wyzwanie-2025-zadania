import { randomBytes } from "node:crypto";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";

interface UserMetadata {
  id: number;
  username: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  private readonly tokenPrefix = "budzet_";
  private readonly tokenLength = 32;

  constructor(
    private usersService: UserService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: CreateUserDto) {
    return this.usersService.create(registerDto);
  }

  async signIn(username: string, password: string) {
    const user = await this.usersService.validateUser(username, password);

    const token = this.generateToken();
    const expiryTime = this.configService.get<number>("EXPIRY_TIME_MS") ?? 8640;
    const expirySeconds = Math.floor(expiryTime / 1000);

    await this.usersService.saveUserToken(
      user.id,
      token,
      new Date(Date.now() + expiryTime),
    );

    return {
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      expires_in: expirySeconds,
      token_type: "Bearer",
    };
  }

  generateToken(): string {
    return `${this.tokenPrefix}${randomBytes(this.tokenLength).toString("hex")}`;
  }

  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new UnauthorizedException("Invalid token format");
    }

    const tokenValue = token.slice(this.tokenPrefix.length);
    const user = await this.usersService.findUserByToken(tokenValue);

    if (user == null) {
      throw new UnauthorizedException("Invalid token");
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (
      user.tokenExpiry !== null &&
      user.tokenExpiry !== undefined &&
      new Date() > user.tokenExpiry
    ) {
      throw new UnauthorizedException("Token has expired");
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  async logout(token: string): Promise<void> {
    if (!token.startsWith(this.tokenPrefix)) {
      return;
    }

    const tokenValue = token.slice(this.tokenPrefix.length);
    await this.usersService.removeUserToken(tokenValue);
  }
}
