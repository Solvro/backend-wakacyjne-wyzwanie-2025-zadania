import { Controller, Post } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}

  @Post("clear")
  async clearAllData(): Promise<{ message: string }> {
    await this.prisma.expense.deleteMany();
    await this.prisma.participant.deleteMany();
    await this.prisma.trip.deleteMany();

    return { message: "All data cleared" };
  }
}
