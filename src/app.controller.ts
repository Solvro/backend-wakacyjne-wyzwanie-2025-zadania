import { Controller, Get, HttpCode } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("wakacyjne") // "wakacyjne" for all andpoints
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend") // path: /wakacyjne/backend
  @HttpCode(418) // manually setting 418 for our endpoint
  getBackend() {
    return this.appService.getHello();
  }
}
