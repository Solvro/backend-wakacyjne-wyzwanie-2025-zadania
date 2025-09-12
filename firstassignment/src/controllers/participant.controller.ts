import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParticipantsService } from '../services/participant.service';
import { CreateParticipantDto } from '../Dto/create-participant-dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../guards/role.decorator';
import { Role } from '../../generated/prisma';

@ApiTags('Uczestnicy')
@Controller('budzetownik')
export class ParticipantController {

    constructor(
        private readonly participantService: ParticipantsService, 
    ) {}

    @Get('participant/:id')
    @ApiOperation({description: "Zwraca uczestnika wraz, z jego wydatkami"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async getWholeParticipant(@Param('id') id: string){
        return this.participantService.participantById(Number.parseInt(id));
    }

    @Get('participants')
    @ApiOperation({description: "Zwraca uczestników wraz, z ich wydatkami"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async getWholeParticipants(){
        return this.participantService.allParticipants();
    }

    @Delete('deleteParticipant/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.COORDINATOR)
    @ApiOperation({description: "Usuwa wybranego uczestnika"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async deleteParticipant(@Param('id') id: string){
        return this.participantService.deleteParticipant(Number.parseInt(id));
    }

    @Post('addParticipant')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({description: "Dodaje nowego uczestnika"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async addParticipant(@Body() createParticipantDto: CreateParticipantDto){
        return this.participantService.createParticipant(createParticipantDto);
    }

    @Patch('updateParticipant/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({description: "Dodaje nowy wydatek"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async updateParticipant(@Param('id') id: string, @Body() newData: CreateParticipantDto){
        const parameters = {id: Number.parseInt(id), newData}
        return this.participantService.updateParticipant(parameters);
    }
}