import { Controller, Get, HttpCode } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { AppService } from "./app.service";
import { Public } from "./common/decorators/public.decorator";

@ApiTags("app")
@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get("backend") // path for me to copy: http://localhost:3000/wakacyjne/backend
  @HttpCode(418)
  @ApiOperation({ summary: "Health check endpoint" })
  @ApiOkResponse({ description: "Returns a welcome message", type: String })
  @ApiNotFoundResponse({ description: "Backend not found" })
  getBackend() {
    return this.appService.getHello();
  }
}
