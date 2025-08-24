import { Controller, Get, Header, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@Controller("wakacyjne")
@ApiTags("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @ApiOperation({
    summary: "The default api",
    description: "Just here to look awesome",
  })
  @ApiResponse({
    status: 200,
    description:
      "It is here just to avoid angering eslint (not sure if i can delete it)",
  })
  @HttpCode(418)
  @Header("Content-Type", "application/json")
  getHello() {
    return this.appService.getHello();
  }
}
