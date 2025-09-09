import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@ApiTags("wakacyjne")
@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  @ApiOperation({
    summary: "Nie wiem",
  })
  @ApiResponse({
    status: 200,
    description: "działa",
  })
  getHello() {
    return this.appService.getHello();
  }
}
