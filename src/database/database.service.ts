import { PrismaClient } from "@prisma/client";

import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async getTrips() {
    return this.trip.findMany();
  }

  async createTrip(data: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }) {
    return this.trip.create({
      data: {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });
  }
}
