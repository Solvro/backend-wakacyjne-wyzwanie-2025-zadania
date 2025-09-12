import { Sex } from "@prisma/client";
import { compare, hash } from "bcrypt";

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { UserMetadata } from "../user/dto/user-metadata";
import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
  private readonly tokenPrefix = "token_";

  constructor(private usersService: UserService) {}

  async validateToken(token: string): Promise<UserMetadata> {
    return token.startsWith(this.tokenPrefix) && this.checkExpiration(token)
      ? await this.usersService.findMetadataOrFail(
          token.slice(this.tokenPrefix.length),
        )
      : Promise.reject(new Error("Invalid token"));
  }

  private checkExpiration(token: string): boolean {
    const dateHex = token.slice(this.tokenPrefix.length).slice(0, 13);
    const date = Number.parseInt(dateHex, 16);
    return Date.now() - date < 1000 * 60 * 30; // 30min
  }

  generateToken(email: string): string {
    const date = Date.now();

    return `${this.tokenPrefix}${date.toString(16)}${email}`;
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(email);

    if (user === null) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid || !user.isEnabled) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return { token: this.generateToken(user.email) };
  }

  async register(
    email: string,
    password: string,
    passwordConfirmation: string,
    name: string,
    middleName: string | undefined,
    lastName: string,
    sex: Sex,
  ): Promise<LoginResponseDto> {
    if (password !== passwordConfirmation) {
      throw new UnauthorizedException("Password confirmation does not match");
    } else if ((await this.usersService.findOne(email)) === null) {
      const hashPassword = await hash(password, 12);
      const newUser = await this.usersService.createUser(
        email,
        hashPassword,
        name,
        middleName,
        lastName,
        sex,
      );
      return { token: this.generateToken(newUser.email) };
    } else {
      throw new ConflictException("User with this email already exists");
    }
  }
}
