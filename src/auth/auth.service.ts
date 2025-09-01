import { Role } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { CreateUserResponseDto } from "src/user/dto/create-user-response.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  private readonly tokenPrefix = "token_";

  generateToken(email: string): string {
    return `${this.tokenPrefix}${email}`;
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const salt = 10;
    const hashedPassword = await hash(password, salt);

    const user = await this.userService.create({
      email,
      password: hashedPassword,
      role: Role.USER,
      isEnabled: true,
    });

    return {
      email: user.email,
      message: "User created",
    } as CreateUserResponseDto;
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findOne(email);
    if (
      user === null ||
      !(await compare(password, user.password).catch(() => false))
    ) {
      throw new UnauthorizedException();
    }
    return { token: this.generateToken(user.email) };
  }
}
