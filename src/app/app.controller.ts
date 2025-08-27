import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@ApiTags("App")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("wakacyjne/backend")
  @ApiOperation({ summary: "wakacyjne backend" })
  @ApiResponse({ status: 418, description: "quote" })
  @HttpCode(418)
  getBackend(): { title: string; quote: string } {
    return this.appService.getBackend();
  }
}
