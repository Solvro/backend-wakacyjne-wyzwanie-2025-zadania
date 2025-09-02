import { User } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { userToMetadata } from "./dto/user-metadata";

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  async findMetadataOrFail(email: string) {
    const user = await this.database.user.findUnique({ where: { email } });
    if (user === null) {
      throw new NotFoundException("User were not found");
    }

    return userToMetadata(user);
  }

  async create(createUsertDto: CreateUserDto) {
    return this.database.user.create({
      data: {
        email: createUsertDto.email,
        aboutMe: createUsertDto.aboutMe,
        password: createUsertDto.password,
        role: createUsertDto.role,
        isEnabled: createUsertDto.isEnabled,
        name: createUsertDto.name,
      },
    });
  }

  async findAll() {
    return this.database.user.findMany({
      select: {
        email: true,
        name: true,
        aboutMe: true,
        role: true,
      },
    });
  }

  async findOne(email: string) {
    return this.database.user.findUnique({
      where: { email },
      select: {
        email: true,
        name: true,
        aboutMe: true,
        role: true,
      },
    });
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return this.database.user.update({
      where: { email },
      data: {
        aboutMe: updateUserDto.aboutMe,
        name: updateUserDto.name,
      },
    });
  }

  async remove(email: string) {
    return this.database.user.delete({ where: { email } });
  }

  async enableUser(email: string) {
    const user = await this.findByIdOrFail(email);
    user.isEnabled = false;
    await this.updateUser(user);
  }

  async disableUser(email: string) {
    const user = await this.findByIdOrFail(email);
    user.isEnabled = false;
    await this.updateUser(user);
  }

  async findByIdOrFail(email: string) {
    const user = await this.database.user.findUnique({
      where: { email },
    });
    if (user === null) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async findUser(email: string) {
    return this.database.user.findUnique({ where: { email } });
  }

  async updateUser(user: User): Promise<User> {
    return await this.database.user.update({
      where: { email: user.email },
      data: {
        ...user,
      },
    });
  }
}
