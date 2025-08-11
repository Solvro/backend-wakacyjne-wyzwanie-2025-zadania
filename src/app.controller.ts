import { Controller, Get, HttpCode } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("wyzwanie")
  @HttpCode(418)
  getHello(): { title: string; quote: string } {
    return this.appService.getHello();
  }
}
