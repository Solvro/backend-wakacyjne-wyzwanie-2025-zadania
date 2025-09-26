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

  private expiryTimeMs = 2000000000;

  async validateToken(token: string): Promise<UserMetadata> {
    if (!token.startsWith(this.tokenPrefix)) {
      throw new UnauthorizedException("Invalid token");
    }

    const parts = token.split("__");
    const email = parts[2];
    const createdAt = Number(parts[3]);

    if (createdAt + this.expiryTimeMs < Date.now()) {
      throw new UnauthorizedException("Token expired");
    }

    const metaDataReturn = await this.userService.findOneOrFail(email);
    return userToMetadata(metaDataReturn);
  }

  async signIn(email: string, password: string) {
    const usr = await this.userService.findOneOrFail(email);

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

    try {
      await this.userService.registerUser({
        email: registerUserDto.email,
        login: registerUserDto.login,
        password: await hash(registerUserDto.password, 10),
        age: registerUserDto.age,
        description: registerUserDto.description,
      });
    } catch {
      throw new InternalServerErrorException("User could not be created");
    }
  }
}
