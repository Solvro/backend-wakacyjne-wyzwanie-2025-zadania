import { AuthRole, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { JwtPayload } from "../common/interfaces/jwt-payload.interface";
import { DatabaseService } from "../database/database.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async updateUser(email: string, dto: UpdateUserDto, requester: JwtPayload) {
    if (requester.role !== AuthRole.ADMIN && requester.sub !== email) {
      throw new ForbiddenException("You can only modify your own account");
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user == null) {
      throw new NotFoundException(`User ${email} not found`);
    }

    const data: Prisma.UserUpdateInput = {};

    if (dto.name !== undefined) {
      data.name = dto.name;
    }

    if (dto.password !== undefined) {
      data.password = await bcrypt.hash(dto.password, 12);
    }

    return this.prisma.user.update({
      where: { email },
      data,
    });
  }
}
