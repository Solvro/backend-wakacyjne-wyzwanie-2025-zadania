import { Role, Sex, User } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { UserMetadata, userToMetadata } from "./dto/user-metadata";
import { UserUpdateResponseDto } from "./dto/user-update-response.dto";

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async disableAccount(email: string) {
    const user = await this.findByIdOrFail(email);
    user.isEnabled = false;
    await this.mergeUser(user);
  }

  async enableAccount(email: string) {
    const user = await this.findByIdOrFail(email);
    user.isEnabled = true;
    await this.mergeUser(user);
  }

  async findOne(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { email } });
  }

  async findMetadataOrFail(email: string): Promise<UserMetadata> {
    return userToMetadata(await this.findByIdOrFail(email));
  }

  async updateUserData(
    email: string,
    newName: string | null | undefined,
    middleName: string | null | undefined,
    lastName: string | null | undefined,
  ): Promise<UserUpdateResponseDto> {
    const user = await this.findByIdOrFail(email);
    if (newName !== undefined && newName !== null) {
      user.name = newName;
    }
    if (middleName !== undefined) {
      user.middleName = middleName;
    }
    if (lastName !== undefined && lastName !== null) {
      user.lastName = lastName;
    }

    return await this.mergeUser(user);
  }

  private async mergeUser(user: User): Promise<User> {
    return await this.databaseService.user.update({
      where: { email: user.email },
      data: {
        ...user,
      },
    });
  }

  private async findByIdOrFail(email: string): Promise<User> {
    const found = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (found === null) {
      throw new NotFoundException("User not found");
    }
    return found;
  }

  async createUser(
    email: string,
    password: string,
    name: string,
    middleName: string | undefined,
    lastName: string,
    sex: Sex,
  ): Promise<User> {
    return this.databaseService.user.create({
      data: {
        email,
        password,
        isEnabled: true,
        name,
        middleName,
        lastName,
        role: Role.USER,
        sex,
      },
    });
  }
}
