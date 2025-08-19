import { Controller, Post } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}

  @Post("stats")
  async getDatabaseStats(): Promise<{
    participants: number;
    trips: number;
    expenses: number;
  }> {
    const [participantCount, tripCount, expenseCount] = await Promise.all([
      this.prisma.participant.count(),
      this.prisma.trip.count(),
      this.prisma.expense.count(),
    ]);

    return {
      participants: participantCount,
      trips: tripCount,
      expenses: expenseCount,
    };
  }

  @Post("clear")
  async clearAllData(): Promise<{ message: string }> {
    await this.prisma.expense.deleteMany();
    await this.prisma.participant.deleteMany();
    await this.prisma.trip.deleteMany();

    return { message: "All data cleared" };
  }
}
