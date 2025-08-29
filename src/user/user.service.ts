import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
// import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from "src/prisma/prisma.service";

import { ConflictException, Injectable } from "@nestjs/common";

import { CreateUserResponseDto } from "./dto/create-user-response.dto";
import { userToMetadata } from "./dto/user-metadata";
import { UserUpdateResponseDto } from "./dto/user-update-response.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async disableUser(email: string) {
    const user = await this.findByIdOrFail(email);
    user.is_enabled = false;
    await this.mergeUserData(user);
  }
  async enableUser(email: string) {
    const user = await this.findByIdOrFail(email);
    user.is_enabled = true;
    await this.mergeUserData(user);
  }

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findMetadataOrFail(email: string) {
    const user = await this.findByIdOrFail(email);
    return userToMetadata(user);
  }

  async updateUserData(
    email: string,
    newAboutMe: string | null | undefined,
    newName: string | null | undefined,
  ): Promise<UserUpdateResponseDto> {
    const user = await this.findByIdOrFail(email);
    if (newAboutMe !== undefined) {
      user.about_me = newAboutMe;
    }
    if (newName !== undefined) {
      user.name = newName;
    }
    return await this.mergeUserData(user);
  }

  private async mergeUserData(user: User): Promise<UserUpdateResponseDto> {
    return await this.prisma.user.update({
      where: { email: user.email },
      data: { ...user },
    });
  }

  private async findByIdOrFail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user === null) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  }
  async createUser(
    email: string,
    password: string,
  ): Promise<CreateUserResponseDto> {
    if ((await this.findOne(email)) !== null) {
      throw new ConflictException("User with the given email already exists");
    }
    return this.prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
        is_enabled: true,
        role: "USER",
      },
    });
  }
}
