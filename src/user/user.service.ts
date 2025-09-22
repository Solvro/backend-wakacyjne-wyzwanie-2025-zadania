import { User } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async disableAccount(email: string) {
    await this.changeAccountStatus(email, true);
  }

  async enableAccount(email: string) {
    await this.changeAccountStatus(email, false);
  }

  async changeAccountStatus(email: string, is_enabled: boolean) {
    const user = await this.getOne(email);

    user.is_enabled = is_enabled;

    return await this.databaseService.user.update({
      where: { email },
      data: {
        ...user,
      },
    });
  }

  async getAll(): Promise<User[]> {
    return this.databaseService.user.findMany();
  }

  async getOne(email: string): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (user === null) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.databaseService.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        role: dto.role,
        is_enabled: dto.is_enabled,
        name: dto.name,
      },
    });
  }

  async update(email: string, dto: UpdateUserDto): Promise<User> {
    return this.databaseService.user.update({
      where: { email },
      data: dto,
    });
  }

  async delete(email: string): Promise<void> {
    await this.databaseService.user.delete({
      where: { email },
    });
  }
}
