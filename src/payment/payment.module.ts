import { AuthService } from "src/auth/auth.service";
import { DatabaseModule } from "src/database/database.module";
import { ParticipantModule } from "src/participant/participant.module";

import { Module } from "@nestjs/common";

import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
  imports: [DatabaseModule, ParticipantModule],
  controllers: [PaymentController],
  providers: [PaymentService, AuthService],
})
export class PaymentModule {}
