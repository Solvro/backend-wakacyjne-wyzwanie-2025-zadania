import { Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { DatabaseService } from "./database.service";

@Controller("database")
@ApiTags("database")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}

  @Get("stats")
  @ApiOperation({ summary: "Get database statistics" })
  @ApiResponse({
    status: 200,
    description: "Statistics retrieved successfully",
  })
  async getDatabaseStats(): Promise<{
    participants: number;
    trips: number;
    expenses: number;
    timestamp: Date;
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
      timestamp: new Date(),
    };
  }

  @Post("clear")
  @ApiOperation({ summary: "Clear all data" })
  @ApiResponse({ status: 200, description: "Data cleared successfully" })
  async clearAllData() {
    await this.prisma.expense.deleteMany();
    await this.prisma.participant.deleteMany();
    await this.prisma.trip.deleteMany();
  }
}
