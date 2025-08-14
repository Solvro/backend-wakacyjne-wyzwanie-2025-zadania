import { Controller, Get, HttpCode } from "@nestjs/common";
import { DbService } from "./db.service";
import { AppService } from "./app.service";

@Controller("api/v1/")
export class AppController {
  constructor(private readonly appService: AppService, private readonly dbService: DbService) {}

  @Get("wakacyjne/backend")
  @HttpCode(418)
  getBackend(): { title: string; quote: string } {
    return this.appService.getBackend();
  }

  @Get("db/test/show")
  async getDbTest(): Promise<unknown> {
    return await this.dbService.getTest();
  }

  @Get("db/test/create")
  async getDbTestCreate(): Promise<void> {
    return await this.dbService.getTestCreate();
  }

  @Get("db/test/clear")
  async getDbTestClear(): Promise<void> {
    return await this.dbService.getTestClear();
  }
}