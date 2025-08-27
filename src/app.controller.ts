import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";

@ApiTags("wakacyjne")
@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  @ApiOperation({ description: "Returns the result of Task1" })
  @ApiOkResponse({ description: "Successful response", type: Object })
  Task1(): object {
    return this.appService.Task1();
  }
}
