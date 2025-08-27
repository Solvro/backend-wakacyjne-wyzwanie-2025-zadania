import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@ApiTags("app")
@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  @ApiOperation({ summary: "Get hello message" })
  @ApiResponse({
    status: 418,
    description: "I'm a teapot - Hello message returned.",
  })
  getHello(): object {
    return this.appService.getHello();
  }
}
