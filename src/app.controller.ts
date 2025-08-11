import { Controller, Get, HttpCode } from "@nestjs/common";

import { AppService } from "./app.service";

export interface Result {
  title: string;
  quote: string;
}

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  getHello(): Result {
    return this.appService.getHello();
  }
}
