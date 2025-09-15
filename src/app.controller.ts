import { Controller, Get, HttpCode } from "@nestjs/common";

import type { HelloResponse } from "./app.service";
import { AppService } from "./app.service";

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  getHello(): HelloResponse {
    return this.appService.getHello();
  }
}
