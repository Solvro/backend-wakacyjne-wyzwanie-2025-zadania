import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  providers: [UserService, PrismaService, AuthService],
  controllers: [UserController],
})
export class UserModule {}
