import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";
import * as type from "./interfaces/json-request.interface";

@Controller("wakacyjne")
@ApiTags("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(418)
  @Get("backend")
  @ApiOperation({
    summary: "Get backend response",
    description: "Retrieves a sample response from the backend",
  })
  @ApiResponse({
    status: 200,
    description: "The sample response has been successfully retrieved.",
  })
  getHello(): type.JsonRequest {
    return this.appService.getHello();
  }
}
