import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClientExtends } from "@prisma/client/extension";

@Injectable()
export class DatabaseService
  extends PrismaClientExtends
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }
}
