import { Controller, Get, HttpCode } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(418)
  @Get("backend")
  getHello(): { message: { title: string; quote: string } } {
    return this.appService.getHello();
  }
}
