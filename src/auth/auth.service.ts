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
  private readonly tokenExpirationMs = 1000 * 60 * 60 * 24; // 24 godziny

  constructor(private readonly usersService: UserService) {}

  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new UnauthorizedException("Invalid token");
    }

    const raw = token.slice(this.tokenPrefix.length);
    const [dateHex, email] = raw.split("_");

    if (!dateHex || !email) {
      throw new UnauthorizedException("Invalid token format");
    }

    const timestamp = Number.parseInt(dateHex, 16);
    if (
      Number.isNaN(timestamp) ||
      Date.now() - timestamp > this.tokenExpirationMs
    ) {
      throw new UnauthorizedException("Token expired");
    }

    return this.usersService.findMetadataOrFail(email);
  }

  private generateToken(email: string): string {
    const timestampHex = Date.now().toString(16);
    return `${this.tokenPrefix}${timestampHex}_${email}`;
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(email);
    if (
      user == null ||
      !(await compare(password, user.password)) ||
      !user.isEnabled
    ) {
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
    }

    const existingUser = await this.usersService.findOne(email);
    if (existingUser != null) {
      throw new ConflictException("User with this email already exists");
    }

    const hashedPassword = await hash(password, 12);
    const newUser = await this.usersService.createUser(
      email,
      hashedPassword,
      name,
      middleName,
      lastName,
      sex,
    );

    return { token: this.generateToken(newUser.email) };
  }
}
