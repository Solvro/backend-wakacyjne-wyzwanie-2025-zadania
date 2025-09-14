import { Role } from "@prisma/client";
import { compare, hash } from "bcrypt";

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserMetadata } from "../users/dto/user-metadata";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { UsersService } from "../users/users.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  private readonly tokenPrefix = process.env.TOKEN_PREFIX ?? "";
  private readonly tokenSeparator = process.env.TOKEN_SEPARATOR ?? "_";
  private readonly expiryTimeMs = Number(process.env.EXPIRY_TIME_MS ?? 0);

  constructor(private service: UsersService) {}

  private generateToken(email: string): string {
    const tokenArray = new Array<string>();

    tokenArray.push(this.tokenPrefix, email, Date.now().toString());

    return tokenArray.join(this.tokenSeparator);
  }

  async validateToken(token: string): Promise<UserMetadata> {
    const tokenParts = token.split(this.tokenSeparator);
    if (tokenParts.length !== 3 || tokenParts[0] !== this.tokenPrefix) {
      throw new UnauthorizedException("Invalid token");
    }

    const createdAt = Number(tokenParts[2]);
    if (
      Number.isNaN(createdAt) ||
      (this.expiryTimeMs > 0 && Date.now() - createdAt > this.expiryTimeMs)
    ) {
      throw new UnauthorizedException("Token expired");
    }

    const email = tokenParts[1];
    return await this.service.findMetadataOrFail(email);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.service.findOne(loginDto.email);
    if (user === null) {
      throw new NotFoundException("User not found");
    }

    if (!(await compare(loginDto.password, user.password).catch(() => false))) {
      throw new ForbiddenException("Invalid password");
    }

    return { token: this.generateToken(user.email) };
  }

  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const emailExists = await this.service.findOne(createUserDto.email);
    if (emailExists !== null) {
      throw new ConflictException("User with this email already exists");
    }

    const saltOrRounds = 10;
    const hashedPassword = await hash(createUserDto.password, saltOrRounds);

    const user = await this.service.create({
      email: createUserDto.email,
      password: hashedPassword,
      name: createUserDto.name,
      role: Role.USER,
      birthday: createUserDto.birthday,
    });

    return {
      email: user.email,
      name: user.name,
      birthday: user.birthday,
    } as UserResponseDto;
  }
}
