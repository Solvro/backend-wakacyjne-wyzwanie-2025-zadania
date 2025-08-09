import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("wakacyjne/backend")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.I_AM_A_TEAPOT) // 418
  getHello() {
    return this.appService.getHello();
  }
}
