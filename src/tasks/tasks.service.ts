import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

import { PaymentsService } from "../payments/payments.service";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private service: PaymentsService) {}

  @Cron("* * * * *")
  async updateRates() {
    this.logger.log("Updating currency rates...");
    await this.service.updateRates();
  }
}
