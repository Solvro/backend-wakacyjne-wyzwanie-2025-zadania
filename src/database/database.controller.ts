import { Controller, Delete, Get, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { DatabaseService } from "./database.service";

@ApiTags("Database")
@Controller("api/v1/db")
export class DatabaseControler {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get("test")
  @ApiOperation({ summary: "Get whole database" })
  @ApiResponse({ status: 200, description: "Lists of all tables" })
  async dbtest(): Promise<unknown> {
    return await this.databaseService.test();
  }

  @Put("test")
  @ApiOperation({ summary: "Add Brazil trip with random ID" })
  @ApiResponse({ status: 200, description: "Brazil trip added" })
  async dbTestCreate(): Promise<void> {
    await this.databaseService.testCreate();
  }

  @Delete("test")
  @ApiOperation({ summary: "Clear whole database" })
  @ApiResponse({ status: 200, description: "Database cleared" })
  async dbTestClear(): Promise<void> {
    await this.databaseService.testClear();
  }
}
