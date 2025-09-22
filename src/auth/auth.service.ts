import { Role } from "@prisma/client";
import { compare, hash } from "bcrypt";

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";

import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserMetadata } from "../user/dto/metadata-user";
import { UserService } from "../user/user.service";
import { LoginResponseDto } from "./dto/response-auth.dto";

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

    if (!user.is_enabled || !isValid) {
      throw new UnauthorizedException();
    }

    const currentTime = Date.now().toString();

    return { token: `${this.tokenPrefix}__${email}__${currentTime}` };
  }

  async register(createUserDto: CreateUserDto): Promise<void> {
    const { email, password } = createUserDto;

    let userExists = false;
    try {
      await this.usersService.getOne(email);
      userExists = true;
    } catch {
      userExists = false;
    }

    if (userExists) {
      throw new ConflictException("User already exists");
    }

    const salt = 10;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const hashedPassword: string = await hash(password, salt);

    try {
      await this.usersService.create({
        email,
        password: hashedPassword,
        role: Role.USER,
        is_enabled: true,
      });
    } catch {
      throw new InternalServerErrorException("User could not be created");
    }
  }
}
