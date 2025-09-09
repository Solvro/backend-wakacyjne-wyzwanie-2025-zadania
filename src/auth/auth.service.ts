import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { compare } from "bcrypt";
import { DatabaseService } from "../database/database.service";
import { RegisterDto } from "./dto/register.dto";
import { Role } from "@prisma/client";
import { UserService } from "../user/user.service";
import { UserMetadata } from "../user/dto/user-metadata";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
  private readonly tokenPrefix = "token_";

  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UserService
  ) {}

  async register(dto: RegisterDto): Promise<void> {
    const existing = await this.db.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException("Email already in use");
    }

    const password = await bcrypt.hash(dto.password, 12);

    await this.db.user.create({
      data: {
        email: dto.email,
        name: dto.name ?? null,
        password, 
        role: Role.USER,
        isEnabled: true,
      },
    });
  }

  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new UnauthorizedException("Invalid token");
    }
    const email = token.slice(this.tokenPrefix.length);
    return this.usersService.findMetadataOrFail(email);
  }

  generateToken(email: string): string {
    return `${this.tokenPrefix}${email}`;
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(email);
    if (
      user === null ||
      !user.isEnabled ||
      !(await compare(password, user.password).catch(() => false))
    ) {
      throw new UnauthorizedException();
    }
    return { token: this.generateToken(user.email) };
  }
}
