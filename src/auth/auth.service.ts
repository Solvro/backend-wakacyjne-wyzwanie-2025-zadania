import * as bcrypt from "bcrypt";

import { ConflictException, Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { UserSignupDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup(userSignupDto: UserSignupDto) {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        email: userSignupDto.email,
      },
    });

    if (existingUser !== null) {
      throw new ConflictException("A user with whis email already exists.");
    }

    const rolesString = "000"; //TODO: create binary role encryption and decryption functions using ROLES_NUMBER variable
    const passwordHash = await bcrypt.hash(userSignupDto.password, 10);
    await this.prismaService.user.create({
      data: {
        email: userSignupDto.email,
        password: passwordHash,
        roles: rolesString,
      },
    });

    return {
      email: userSignupDto.email,
      roles: rolesString,
    };
  }
}
