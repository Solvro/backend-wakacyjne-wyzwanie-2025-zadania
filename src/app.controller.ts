import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";
import type { HelloResponseDTO } from "./app.service";

@ApiTags("wakacyjne")
@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  @ApiResponse({ status: 418, description: "Service is running." })
  @ApiOperation({ summary: "Check if the backend service is running" })
  getHello(): HelloResponseDTO {
    return this.appService.getHello();
  }
}
