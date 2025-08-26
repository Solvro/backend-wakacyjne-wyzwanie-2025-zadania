import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TripsService } from './services/trip.service';
import { ExpensesService } from './services/expense.service';
@ApiTags('Budżetownik')
@Controller('budzetownik')
export class AppController {
  constructor(private readonly appService: AppService, private readonly tripService: TripsService, private readonly expenseService: ExpensesService) {}

  @Get('backend')
  @ApiOperation({description: "Dzban"})
  @HttpCode(418)
  @ApiResponse({ status: 418, description: "Dzban!"})
  getHello(): {title: string, quote: string} {
    return this.appService.getHello();
  }

}