import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
