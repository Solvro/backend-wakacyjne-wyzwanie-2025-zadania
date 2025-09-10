import { compare } from "bcrypt";

import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { CreateUserDto } from "../user/dto/create-dto.user";
import { UserMetadata } from "../user/dto/user-metadata";
import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
  private readonly tokenPrefix = "token_";
  private readonly EXPIRY_TIME_MS: number = Number.parseInt(
    process.env.EXPIRY_TIME_MS ?? "3600000",
  );
  constructor(private userService: UserService) {}

  generateToken(email: string): string {
    return `${this.tokenPrefix}${email}|${Date.now().toString()}`;
  }
  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findOne(email);

    if (!user.is_enabled) {
      throw new ForbiddenException("To konto zostało zablokowane");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const isPasswordValid = await compare(password, user.password).catch(
      () => false,
    );
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!isPasswordValid) {
      throw new UnauthorizedException("Podane hasło jest nieprawidłowe");
    }

    return { token: this.generateToken(user.email) };
  }
  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new UnauthorizedException("Niepoprawny token");
    }
    const tokenBody = token.slice(this.tokenPrefix.length);
    const [email, timestampString] = tokenBody.split("|");
    const generated_at = Number.parseInt(timestampString, 10);
    if (Date.now() - generated_at > this.EXPIRY_TIME_MS) {
      throw new UnauthorizedException("Token uzytkownika wygasł");
    }
    const userMetadata = await this.userService.findMetaData(email);
    return userMetadata;
  }
  async createUser(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
