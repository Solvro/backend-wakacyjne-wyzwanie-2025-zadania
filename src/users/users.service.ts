import * as bcrypt from "bcrypt";

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import type { JwtUser } from "../common/decorators/current-user.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user === null) {
      throw new NotFoundException("Użytkownik nie znaleziony");
    }
    const { passwordHash, ...safe } = user;
    return safe;
  }

  async update(actor: JwtUser, targetId: number, dto: UpdateUserDto) {
    if (actor.role !== "ADMIN" && actor.sub !== targetId) {
      throw new ForbiddenException("Możesz zmieniać tylko własny profil");
    }
    if (actor.role !== "ADMIN" && typeof dto.role === "string") {
      throw new ForbiddenException("Tylko admin może zmienić rolę");
    }

    const data: {
      email?: string;
      passwordHash?: string;
      role?: "USER" | "ADMIN";
    } = {};

    if (typeof dto.email === "string" && dto.email.length > 0) {
      data.email = dto.email;
    }
    if (typeof dto.password === "string" && dto.password.length > 0) {
      data.passwordHash = await bcrypt.hash(dto.password, 12);
    }
    if (dto.role === "USER" || dto.role === "ADMIN") {
      data.role = dto.role;
    }

    const updated = await this.prisma.user.update({
      where: { id: targetId },
      data,
    });
    const { passwordHash, ...safe } = updated;
    return safe;
  }
}
