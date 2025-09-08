import { PrismaClient } from "@prisma/client";

import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async test(): Promise<unknown> {
    const trips = await this.trip.findMany({
      include: { participants: true, expenses: true },
    });
    const users = await this.user.findMany();
    const participants = await this.participant.findMany();
    const expenses = await this.expense.findMany();

    return {
      trips,
      users,
      participants,
      expenses,
    };
  }

  async testCreate(): Promise<void> {
    await this.trip.create({
      data: {
        id: Math.random() * 1_000_000,
        name: "Are Ya trippin???",
        destination: "Brazil",
        start_date: new Date(),
        end_date: new Date(67),
        participants: { create: [] },
        expenses: { create: [] },
      },
    });
  }

  async testClear(): Promise<void> {
    const trips = await this.trip.findMany({
      where: { destination: "Brazil" },
      select: { id: true },
    });

    const trip_ids = trips.map((t) => t.id);

    if (trip_ids.length === 0) {
      return;
    }

    await this.expense.deleteMany({
      where: { trip_id: { in: trip_ids } },
    });

    const participants = await this.participant.findMany({
      where: {
        trips: {
          some: { id: { in: trip_ids } },
        },
      },
    });

    await this.participant.deleteMany({
      where: { id: { in: participants.map((p) => p.id) } },
    });

    await this.trip.deleteMany({
      where: { id: { in: trip_ids } },
    });
  }
}
