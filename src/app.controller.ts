import { Controller, Get, HttpCode } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend") // path for me to copy: http://localhost:3000/wakacyjne/backend
  @HttpCode(418)
  getBackend() {
    return this.appService.getHello();
  }
}