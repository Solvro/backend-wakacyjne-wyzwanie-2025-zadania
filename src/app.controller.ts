import { Controller, Get, HttpCode } from "@nestjs/common";
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AppService } from "./app.service";

class HelloResponseDto {
  @ApiProperty({ example: "Cokolwiek" })
  message: string;
}

@ApiTags("root")
@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  @ApiOperation({ summary: "Endpoint testowy" })
  @ApiResponse({
    status: 418,
    description: "Testowy endpoint na głównym kontrolerze",
    type: HelloResponseDto,
  })
  getHello(): HelloResponseDto {
    return this.appService.getHello() as HelloResponseDto;
  }
}
