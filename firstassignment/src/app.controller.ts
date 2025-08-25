import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TripsService } from './services/trip.service';
import { ExpensesService } from './services/expense.service';
import { CreateTripDto } from './Dto/create-trip-dto';
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

  @Get('trips')
  @ApiOperation({description: "Zwraca wycieczki wraz, z uczestnikami i ich wydatkami."})
  @ApiResponse({ status: 201, description: "Sukces!"})
  async getWholeTrips(){
    return this.tripService.trips();
  }

  @Delete('deleteTrip/:id')
  @ApiOperation({description: "Usuwa wybraną wycieczkę"})
  @ApiResponse({ status: 201, description: "Sukces!"})
  async deleteTrip(@Param('id') id: number){
    return this.tripService.deleteTrip(id);
  }

  @Delete('deleteExpense/:id')
  @ApiOperation({description: "Usuwa wybrany wydatek"})
  @ApiResponse({ status: 201, description: "Sukces!"})
  async deleteExpense(@Param('id') id: number){
    return this.expenseService.deleteExpense(id);
  }

  @Post('addTrip')
  @ApiOperation({description: "Dodaje nową wycieczkę"})
  @ApiResponse({ status: 201, description: "Sukces!"})
  async addTrip(@Body() createTripDto: CreateTripDto){
    return this.tripService.createTrip(createTripDto);
  }


}