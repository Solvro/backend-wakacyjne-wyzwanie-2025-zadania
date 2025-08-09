import { Controller, Get, HttpStatus } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("wakacyjne/backend")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      statusCode: HttpStatus.I_AM_A_TEAPOT, // 418
      message: this.appService.getHello(),
    };
  }
}
