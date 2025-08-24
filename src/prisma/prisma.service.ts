import { PrismaClient } from "@prisma/client";

import { Injectable, OnModuleInit } from "@nestjs/common";

import { DATABASE_URL } from "../config/config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
