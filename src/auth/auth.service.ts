import { Role } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { CreateUserResponseDto } from "src/user/dto/create-user-response.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserMetadata } from "src/user/dto/user-metadata";

import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  private readonly tokenPrefix = "token_";
  private expiryTime = Number(process.env.EXPIRY_TIME_MS);

  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new Error("Invalid token");
    }

    const parts = token.split("_");
    const email = parts[1];
    const createdAt = Number(parts[2]);

    if (createdAt + this.expiryTime < Date.now()) {
      throw new Error("Token expired");
    }

    return await this.userService.findMetadataOrFail(email);
  }

  generateToken(email: string): string {
    const currentTime = Date.now().toString();

    return `${this.tokenPrefix}${email}_${currentTime}`;
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
