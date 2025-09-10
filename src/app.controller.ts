import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@Controller("wakacyjne")
@ApiTags("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @ApiOperation({ summary: "Task 0" })
  @ApiResponse({ status: 418, description: "I'm a teapot" })
  @HttpCode(418)
  getHello() {
    return this.appService.getHello();
  }
}
