import { Controller, Get, HttpCode } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418) // w jednym miejscu w poleceniu jest kod 200, w drugim 418, więc wziąłem losowo
  getHello(): object {
    return this.appService.getHello();
  }
}
