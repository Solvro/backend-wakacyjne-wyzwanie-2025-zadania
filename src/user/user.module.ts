import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
