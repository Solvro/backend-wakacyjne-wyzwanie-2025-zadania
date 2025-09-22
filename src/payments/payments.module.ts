import { PrismaModule } from "src/prisma/prisma.module";

import { Module } from "@nestjs/common";

import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
  imports: [PrismaModule],
})
export class PaymentsModule {}
