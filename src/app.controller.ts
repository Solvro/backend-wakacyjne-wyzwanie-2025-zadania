import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@Controller("wakacyjne")
@ApiTags("Wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @ApiOperation({ summary: "Test request for task 0" })
  @ApiResponse({
    status: 418,
    description: "It's a teapot.",
  })
  @HttpCode(418)
  getHello() {
    return this.appService.getHello();
  }
}
