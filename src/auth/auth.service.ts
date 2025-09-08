import { compare, hash } from "bcrypt";

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { UserMetadata } from "../users/dto/user-metadata.dto";
import { UsersService } from "../users/users.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  private readonly saltRounds = 10;
  private readonly tokenPrefix = "token_";
  private readonly expiryTimeMs =
    Number(process.env.EXPIRY_TIME_MS) || 3_600_000;

  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new UnauthorizedException("Invalid token format");
    }
    const slices = token.slice(this.tokenPrefix.length).split(":");
    if (slices.length !== 2) {
      throw new UnauthorizedException("Invalid token format");
    }
    const [issuedAt, encodedEmail] = slices;
    if (Date.now() - Number(issuedAt) > this.expiryTimeMs) {
      throw new UnauthorizedException("Token expired");
    }
    const email = Buffer.from(encodedEmail, "base64").toString();
    return await this.usersService.findMetadataOrFail(email).catch(() => {
      throw new UnauthorizedException("User not found");
    });
  }

  generateToken(email: string): string {
    const issuedAt = Date.now().toString();
    const encodedEmail = Buffer.from(email).toString("base64");
    return `${this.tokenPrefix}${issuedAt}:${encodedEmail}`;
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(email);
    if (
      user === null ||
      !user.is_enabled ||
      !(await compare(password, user.password).catch(() => false))
    ) {
      throw new UnauthorizedException(
        "Invalid email or password, or account disabled by administrator",
      );
    }
    const token = this.generateToken(user.email);
    return { token };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOne(registerDto.email);
    if (existingUser !== null) {
      throw new ConflictException("User already exists");
    }

    const passwordHash = await hash(registerDto.password, this.saltRounds);

    await this.usersService.create({
      email: registerDto.email,
      password: passwordHash,
      name: registerDto.name,
      aboutMe: registerDto.aboutMe,
    });

    const token = this.generateToken(registerDto.email);
    return { token };
  }
}
