import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@Controller("wakacyjne")
@ApiTags("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(418)
  @Get("backend")
  @ApiOperation({
    summary: "Get backend response",
    description: "Returns a teapot response.",
  })
  @ApiResponse({
    status: 418,
    description: "I'm a teapot",
  })
  getHello() {
    return this.appService.getHello();
  }
}
