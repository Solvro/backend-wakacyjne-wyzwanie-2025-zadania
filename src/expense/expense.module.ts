import { PrismaModule } from "src/prisma/prisma.module";

import { Module } from "@nestjs/common";

import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports: [PrismaModule],
})
export class ExpenseModule {}
