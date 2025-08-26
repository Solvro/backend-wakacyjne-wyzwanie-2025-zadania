import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@Controller("wakacyjne")
@ApiTags("zadanie1")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @ApiOperation({ summary: "Realizacja zadania 1 " })
  @ApiOkResponse({ description: "ok załadowane" })
  @HttpCode(418)
  getHello(): { title: string; quote: string } {
    return this.appService.getHello();
  }
}
