import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

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
    return this.database.user.findMany();
  }

  async findOne(id: string) {
    return this.database.user.findUnique({
      where: { email: id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.database.user.update({
      where: { email: id },
      data: {
        aboutMe: updateUserDto.aboutMe,
        isEnabled: updateUserDto.isEnabled,
        name: updateUserDto.name,
      },
    });
  }

  async remove(id: string) {
    return this.database.user.delete({ where: { email: id } });
  }
}
