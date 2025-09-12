import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TripsService } from '../services/trip.service';
import { CreateTripDto } from '../Dto/create-trip-dto';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../guards/role.decorator';
import { Role } from '../../generated/prisma';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateTripDto } from '../Dto/update-trip-dto';

@ApiTags('Wycieczki')
@Controller('budzetownik')
export class TripController {
    constructor(
        private readonly tripService: TripsService, 
    ) {}


    @Get('trip/:id')
    @ApiOperation({description: "Zwraca wycieczkę wraz, z uczestnikami i ich wydatkami."})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async getWholeTrip(@Param('id') id: string){
        return this.tripService.tripById(Number.parseInt(id));
    }

    @Get('trips')
    @ApiOperation({description: "Zwraca wycieczki wraz, z uczestnikami i ich wydatkami."})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async getWholeTrips(){
        return this.tripService.allTrips();
    }

    @Delete('deleteTrip/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.COORDINATOR,Role.ADMIN)
    @ApiOperation({description: "Usuwa wybraną wycieczkę"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async deleteTrip(@Param('id') id: string){
        return this.tripService.deleteTrip(Number.parseInt(id));
    }

    @Post('addTrip')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.COORDINATOR,Role.ADMIN)
    @ApiOperation({description: "Dodaje nową wycieczkę"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async addTrip(@Body() createTripDto: CreateTripDto){
        return this.tripService.createTrip(createTripDto);
    }

    @Patch('updateTrip/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.COORDINATOR,Role.ADMIN)
    @ApiOperation({description: "Aktualizuje wycieczkę"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async updateTrip(@Param('id') id: string, @Body() newData: UpdateTripDto){
        const parameters = {id: Number.parseInt(id), newData}
        return this.tripService.updateTrip(parameters);
    }
}