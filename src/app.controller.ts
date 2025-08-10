import { Controller, Get } from "@nestjs/common";
import { HttpCode } from "@nestjs/common";

import { AppService } from "./app.service";
import * as type from "./interfaces/json-request.interface";

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(418)
  @Get("backend")
  getHello(): type.JsonRequest {
    return this.appService.getHello();
  }
}
