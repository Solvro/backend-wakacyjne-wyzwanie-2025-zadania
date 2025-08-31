import { PrismaClient } from "@prisma/client";

import {
  INestApplication,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from "@nestjs/common";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  // <-- Dodaj OnApplicationShutdown
  constructor() {
    super({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "info", "warn", "error"]
          : ["warn", "error"],
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onApplicationShutdown(signal?: string) {
    await this.$disconnect();
  }
}
