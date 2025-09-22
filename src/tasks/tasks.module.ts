import { Module } from "@nestjs/common";

import { PaymentsModule } from "../payments/payments.module";
import { TasksService } from "./tasks.service";

@Module({
  imports: [PaymentsModule],
  providers: [TasksService],
})
export class TasksModule {}
