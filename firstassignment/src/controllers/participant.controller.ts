import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParticipantsService } from '../services/participant.service';
import { CreateParticipantDto } from '../Dto/create-participant-dto';

@ApiTags('Uczestnicy')
@Controller('budzetownik')
export class ParticipantController {

    constructor(
        private readonly participantService: ParticipantsService, 
    ) {}

    @Get('participant/:id')
    @ApiOperation({description: "Zwraca uczestnika wraz, z jego wydatkami"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async getWholeParticipant(@Param('id') id: number){
        return this.participantService.participantById(id);
    }

    @Get('participants')
    @ApiOperation({description: "Zwraca uczestników wraz, z ich wydatkami"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async getWholeParticipants(){
        return this.participantService.allParticipants();
    }

    @Delete('deleteParticipant/:id')
    @ApiOperation({description: "Usuwa wybranego uczestnika"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async deleteParticipant(@Param('id') id: string){
        return this.participantService.deleteParticipant(Number.parseInt(id));
    }

    @Post('addParticipant')
    @ApiOperation({description: "Dodaje nowego uczestnika"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async addParticipant(@Body() createParticipantDto: CreateParticipantDto){
        return this.participantService.createParticipant(createParticipantDto);
    }

    @Patch('updateParticipant/:id')
    @ApiOperation({description: "Dodaje nowy wydatek"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async updateParticipant(@Param('id') id: string, @Body() newData: CreateParticipantDto){
        const parameters = {id: Number.parseInt(id), newData}
        return this.participantService.updateParticipant(parameters);
    }
}