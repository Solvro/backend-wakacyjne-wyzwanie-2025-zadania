import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('wakacyjne')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('backend')
  @HttpCode(418)
  getHello(): JSON {
  	      return this.appService.getHello();
  }
}
