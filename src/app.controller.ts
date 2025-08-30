import { Controller, Get } from "@nestjs/common";
import { HttpCode } from "@nestjs/common";

import type { ResponseIntrf } from "./app.service";
import { AppService } from "./app.service";

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  getHello(): ResponseIntrf {
    return this.appService.getHello();
  }
}
