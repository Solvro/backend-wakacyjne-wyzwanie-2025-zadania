import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@Controller("wakacyjne")
@ApiTags("App")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  @ApiOperation({
    summary: "Returns hello world",
    description: "Returns a set message, task 1 leftover",
  })
  @ApiResponse({
    status: 418,
    description: "Request successful (I'm a Teapot)",
  })
  getHello() {
    return this.appService.getHello();
  }
}
