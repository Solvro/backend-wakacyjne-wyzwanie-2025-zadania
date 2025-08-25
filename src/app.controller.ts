import { Controller, Get, HttpCode } from "@nestjs/common";

import { AppService, type HelloResponseDTO } from "./app.service";

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  getHello(): HelloResponseDTO {
    return this.appService.getHello();
  }
}
