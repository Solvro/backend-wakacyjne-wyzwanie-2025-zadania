import * as bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
