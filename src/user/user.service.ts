import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Role, User } from "@prisma/client";

import { DatabaseService } from "../database/database.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UserUpdateDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  async findOneOrFail(email: string): Promise<User> {
    const found = await this.database.user.findUnique({
      where: { email },
    });
    if (found === null) {
      throw new NotFoundException("User not found");
    }
    return found;
  }

  async userAlreadyExist(email: string, login: string, age: number) {
    const found = await this.database.user.findUnique({
      where: { email, login, age },
    });
    if (found != null) {
      throw new ConflictException("User with that data allready exist");
    }
  }

  async registerUser(registerUser: RegisterUserDto) {
    await this.userAlreadyExist(
      registerUser.email,
      registerUser.login,
      registerUser.age,
    );
    return this.database.user.create({
      data: {
        email: registerUser.email,
        login: registerUser.login,
        password: registerUser.password,
        age: registerUser.age,
        role: [Role.USER],
        isEnabled: true,
      },
    });
  }

  async disableAccount(email: string) {
    const user = await this.findOneOrFail(email);
    user.isEnabled = false;
    return await this.database.user.update({
      where: { email },
      data: {
        ...user,
      },
    });
  }

  async enableAccount(email: string) {
    const user = await this.findOneOrFail(email);
    user.isEnabled = true;
    return await this.database.user.update({
      where: { email },
      data: {
        ...user,
      },
    });
  }

  async findOne(email: string): Promise<User | null> {
    return this.database.user.findUnique({ where: { email } });
  }
  async findAll(): Promise<User[]> {
    return this.database.user.findMany();
  }

  async updateUserData(
    email: string,
    updateUserDto: UserUpdateDto,
  ): Promise<User> {
    const cleanData: Partial<UserUpdateDto> = {};

    for (const key of Object.keys(updateUserDto) as (keyof UserUpdateDto)[]) {
      const value = updateUserDto[key];
      if (value !== undefined) {
        (cleanData as Record<keyof UserUpdateDto, unknown>)[key] = value;
      }
    }

    return this.database.user.update({
      where: { email },
      data: cleanData,
    });
  }
  async remove(email: string) {
    await this.findOneOrFail(email);
    return this.database.user.delete({ where: { email } });
  }
}
