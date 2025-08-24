import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@Controller("wakacyjne")
@ApiTags("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  @ApiOperation({
    summary: "Get test api response",
  })
  @ApiResponse({
    status: 200,
    description: "Returns prepared api response for the sake of testing",
  })
  getHello(): {
    title: string;
    quote: string;
    author: string;
    randomanimalfact: string;
  } {
    return this.appService.getHello();
  }
}
