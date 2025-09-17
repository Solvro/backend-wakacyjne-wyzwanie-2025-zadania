import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { RegisterUserDto } from "src/user/dto/register-user.dto";

import { UserMetadata, userToMetadata } from "../user/dto/user-metadata";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  private readonly tokenPrefix = "TOKEN";

  constructor(private userService: UserService) {}

  private expiryTime = 2000000000;

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
    const metaDataReturn = await this.userService.findOneOrFail(email);
    return userToMetadata(metaDataReturn);
  }

  async signIn(email: string, password: string) {
    const usr = await this.userService.findOneOrFail(email);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const isValid = (await compare(password, usr.password)) === true;

    if (!usr.isEnabled || !isValid) {
      throw new UnauthorizedException();
    }

    const currentTime = Date.now().toString();

    return { token: `${this.tokenPrefix}__${email}__${currentTime}` };
  }

  async registerAuth(registerUserDto: RegisterUserDto) {
    let userExists = false;
    try {
      await this.userService.findOneOrFail(registerUserDto.email);
    } catch {
      userExists = true;
    }

    if (userExists) {
      throw new ConflictException("User already exists");
    }

    const salt = 10;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const hashedPassword: string = await hash(registerUserDto.password, salt);

    try {
      await this.userService.registerUser({
        email: registerUserDto.email,
        login: registerUserDto.login,
        password: hashedPassword,
        age: registerUserDto.age,
        description: registerUserDto.description,
      });
    } catch {
      throw new InternalServerErrorException("User could not be created");
    }
  }
}
