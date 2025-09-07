import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@ApiTags("Wakacyjne wyzwanie 2025")
@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(418)
  @Get("backend")
  @ApiOperation({ summary: "Return hello world text" })
  @ApiOkResponse({
    description: "Confirmation that the backend is running",
    schema: { type: "string", example: "Hello World!" },
  })
  getHello() {
    return this.appService.getHello();
  }
}
