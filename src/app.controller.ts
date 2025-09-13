import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@Controller("wakacyjne")
@ApiTags("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(418)
  @Get("backend")
  @ApiOperation({
    summary: "Return a quote",
    description: "Return a set quote (as it was required in task 1)",
  })
  @ApiResponse({
    status: 418,
    description: "You got a recipe for francesinha!!!",
  })
  getHello(): { title: string; quote: string } {
    return this.appService.getHello();
  }
}
