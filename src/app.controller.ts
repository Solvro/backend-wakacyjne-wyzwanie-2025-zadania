import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags, ApiNotFoundResponse } from "@nestjs/swagger";

import { AppService } from "./app.service";

@ApiTags("app")
@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend") // path for me to copy: http://localhost:3000/wakacyjne/backend
  @HttpCode(418)
  @ApiOperation({ summary: "Health check endpoint" })
  @ApiOkResponse({ description: "Returns a welcome message", type: String })
  @ApiNotFoundResponse({ description: "Backend not found" })
  getBackend() {
    return this.appService.getHello();
  }
}