import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { ForexModule } from "../forex/forex.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
  imports: [PrismaModule, ForexModule, AuthModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
