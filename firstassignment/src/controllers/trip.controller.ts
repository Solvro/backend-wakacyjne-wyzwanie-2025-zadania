import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TripsService } from '../services/trip.service';
import { CreateTripDto } from '../Dto/create-trip-dto';

@ApiTags('Wycieczki')
@Controller('budzetownik')
export class TripController {
    constructor(
        private readonly tripService: TripsService, 
    ) {}


    @Get('trip/:id')
    @ApiOperation({description: "Zwraca wycieczkę wraz, z uczestnikami i ich wydatkami."})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async getWholeTrip(@Param('id') id: number){
        return this.tripService.trip(id);
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
    async deleteTrip(@Param('id') id: string){
        return this.tripService.deleteTrip(Number.parseInt(id));
    }

    @Post('addTrip')
    @ApiOperation({description: "Dodaje nową wycieczkę"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async addTrip(@Body() createTripDto: CreateTripDto){
        return this.tripService.createTrip(createTripDto);
    }

    @Put('updateTrip/:id')
    @ApiOperation({description: "Dodaje nowy wydatek"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async updateTrip(@Param('id') id: string, @Body() newData: CreateTripDto){
        const parameters = {id: Number.parseInt(id), newData}
        return this.tripService.updateTrip(parameters);
    }
}