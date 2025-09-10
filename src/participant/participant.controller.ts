import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ResponseParticipantDto } from './dto/response-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantService } from './participant.service';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';

@Controller('participant')
@ApiTags('Participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()

  @HttpCode(HttpStatus.CREATED)

  @ApiOperation({
    summary: "Created a new participant",
  })

  @ApiCreatedResponse({
    description: "Created a new participant",
  })

  @ApiResponse({
    status: 201,
    description: "Created a new participant",
    type: CreateParticipantDto,
  })

  @ApiResponse({
    status: 400,
    description: "Invalid participant data",
  })

  @ApiResponse({
    status: 500,
    description: "Server error",
  })

  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }




  @Get()

  @ApiOperation({
    summary: "Returning all participant",
  })

  @ApiResponse({
    status: 200,
    description: "Participants returned",
    type: [ResponseParticipantDto],
  })

  @ApiResponse({
    status: 404,
    description: "Participants not found",
  })

  @ApiResponse({
    status: 500,
    description: "Server error",
  })

  async findAll() {
    return this.participantService.findAll();
  }




  @Get(':id')

  @ApiOperation({
    summary: "Found an participant with given id",
  })

  @ApiResponse({
    status: 200,
    description: "Participant found",
    type: ResponseParticipantDto,
  })

  @ApiResponse({
    status: 404,
    description: "Participant not found",
  })

  @ApiResponse({
    status: 500,
    description: "Server error",
  })

  async findOne(@Param('id') id: string) {
    return this.participantService.findOne(+id);
  }




  @Patch(':id')

  @ApiOperation({
    summary: "Updated a participant with given id",
  })

  @ApiResponse({
    status: 200,
    description: "Participant updated",
    type: UpdateParticipantDto,
  })

  @ApiResponse({
    status: 404,
    description: "Participants not found",
  })

  @ApiResponse({
    status: 500,
    description: "Server error",
  })

  async update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(+id, updateParticipantDto);
  }




  @Delete(':id')

  @ApiOperation({
    summary: "Deleted a participant with given id",
  })

  @ApiResponse({
    status: 200,
    description: "Participant deleted",
  })

  @ApiResponse({
    status: 404,
    description: "Participants not found",
  })

  @ApiResponse({
    status: 500,
    description: "Server error",
  })

  async remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}
