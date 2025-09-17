import { Role, User } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { UpdateUserDto } from "./dto/update-user";
import { UserMetadata, userToMetadata } from "./dto/user-metadata";

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async findOne(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { email } });
  }

  async findMetadataOrFail(email: string): Promise<UserMetadata> {
    return userToMetadata(await this.findByIdOrFail(email));
  }

  async findByIdOrFail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (user === null) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  }

  async create(email: string, password: string): Promise<User> {
    const rounds = 10;
    const hashedPassword = await bcrypt.hash(password, rounds);
    return this.databaseService.user.create({
      data: {
        email,
        password: hashedPassword,
        role: Role.USER,
      },
    });
  }

  async updateRole(email: string, newRole: User["role"]): Promise<User> {
    return this.databaseService.user.update({
      where: { email },
      data: { role: newRole },
    });
  }

  async updateUserData(newEmail: string): Promise<UpdateUserDto> {
    const user = await this.findByIdOrFail(newEmail);

    return await this.mergeUser(user);
  }

  private async mergeUser(user: User): Promise<User> {
    return this.databaseService.user.update({
      where: { email: user.email },
      data: {
        ...user,
      },
    });
  }
}
