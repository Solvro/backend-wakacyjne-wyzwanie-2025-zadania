import { Controller, Get, Header, HttpCode } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  @Header("Content-Type", "application/json")
  getHello() {
    return this.appService.getHello();
  }
}
