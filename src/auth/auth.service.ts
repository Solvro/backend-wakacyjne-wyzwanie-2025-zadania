import { Role } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { CreateUserResponseDto } from "src/user/dto/create-user-response.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserMetadata } from "src/user/dto/user-metadata";

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  private readonly tokenPrefix = "token_";

  async validateToken(token: string): Promise<UserMetadata> {
    return token.startsWith(this.tokenPrefix)
      ? await this.userService.findMetadataOrFail(
          token.slice(this.tokenPrefix.length),
        )
      : Promise.reject(new Error("Invalid token"));
  }

  generateToken(email: string): string {
    return `${this.tokenPrefix}${email}`;
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const userInBase = await this.userService.findOne(email);
    const isEmailAvailable = userInBase == null;

    if (!isEmailAvailable) {
      throw new ConflictException("There is already a user with this email");
    }

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
    const user = await this.userService.findByIdOrFail(email);

    if (!(await compare(password, user.password).catch(() => false))) {
      throw new ForbiddenException("Wrong password was given");
    }
    return { token: this.generateToken(user.email) };
  }
}
