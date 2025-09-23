import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [DatabaseModule],
})
export class PaymentModule {}
