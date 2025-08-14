import { Controller, Get, HttpCode, Put, Delete } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { AppService } from "./app.service";

@Controller("api/v1/")
export class AppController {
  constructor(private readonly appService: AppService, private readonly databaseService: DatabaseService) {}

  @Get("wakacyjne/backend")
  @HttpCode(418)
  getBackend(): { title: string; quote: string } {
    return this.appService.getBackend();
  }

  @Get("db/test/show")
  async getDbTest(): Promise<unknown> {
    return await this.databaseService.getTest();
  }

  @Put("db/test/create")
  async getDbTestCreate(): Promise<void> {
    await this.databaseService.getTestCreate();
  }

  @Delete("db/test/clear")
  async getDbTestClear(): Promise<void> {
    await this.databaseService.getTestClear();
  }
}