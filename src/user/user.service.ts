import { Role } from "@prisma/client";
import { hash } from "bcrypt";

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string, name?: string) {
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists !== null) {
      throw new ConflictException("User with this email already exists");
    }
    const hashed: string = await hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashed, name },
    });
    return user;
  }

  async findByEmailOrFail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user === null) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async findMetadataOrFail(email: string) {
    const u = await this.prisma.user.findUnique({
      where: { email },
      select: { email: true, role: true, isEnabled: true },
    });
    if (u === null) {
      throw new NotFoundException("User not Found");
    }
    if (!u.isEnabled) {
      throw new NotFoundException("User disabled");
    }
    return u;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
      },
    });
  }

  async updateUser(
    email: string,
    dto: Partial<{
      email: string;
      password: string;
      name?: string;
      role?: Role;
      additionalInfo?: string;
    }>,
  ) {
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists === null) {
      throw new NotFoundException("User not found");
    }

    const data: {
      email?: string;
      password?: string;
      name?: string | null;
      role?: Role;
      additionalInfo?: string | null;
    } = {};

    if (dto.email !== undefined) {
      data.email = dto.email;
    }

    if (dto.password !== undefined && dto.password !== "") {
      data.password = await hash(dto.password, 10);
    }

    if (dto.name !== undefined) {
      data.name = dto.name;
    }
    if (dto.role !== undefined) {
      data.role = dto.role;
    }
    if (dto.additionalInfo !== undefined) {
      data.additionalInfo = dto.additionalInfo;
    }

    const updated = await this.prisma.user.update({
      where: { email },
      data,
      select: {
        email: true,
        name: true,
        role: true,
        additionalInfo: true,
        isEnabled: true,
        createdAt: true,
      },
    });

    return updated;
  }
}
