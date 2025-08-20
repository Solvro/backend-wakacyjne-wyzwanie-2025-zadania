import { PrismaClient } from "@prisma/client";

import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getTrips() {
    return this.trip.findMany();
  }

  async createTrip(data: {
    destination: string;
    description?: string;
    start_date: string;
    end_date?: string;
  }) {
    return this.trip.create({
      data: {
        destination: data.destination,
        description: data.description,
        start_date: new Date(data.start_date),
        end_date: data.end_date == null ? null : new Date(data.end_date),
      },
    });
  }
}
