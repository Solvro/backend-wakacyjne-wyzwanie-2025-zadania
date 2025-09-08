import { compare } from "bcrypt";

import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UserMetadata } from "../user/metadata-user";
import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./login-response.dto";

@Injectable()
export class AuthService {
  private readonly tokenPrefix = "TOKEN";

  constructor(private usersService: UserService) {}

  private expiryTime = 1_000_000_000;

  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new Error("Invalid token");
    }

    const parts = token.split("__");
    const email = parts[2];
    const createdAt = Number(parts[3]);

    if (createdAt + this.expiryTime < Date.now()) {
      throw new Error("Token expired");
    }

    return this.usersService.getOne(email);
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.usersService.getOne(email);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const isValid = (await compare(password, user.password)) === true;

    if (!user.isEnabled || !isValid) {
      throw new UnauthorizedException();
    }

    const currentTime = Date.now().toString();

    return { token: `${this.tokenPrefix}__${email}__${currentTime}` };
  }
}
