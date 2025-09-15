import { Role } from "@prisma/client";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/role.guard";
import { UserMetadata } from "../user/dto/user-metadata";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantService } from "./participant.service";

@Controller("participant")
@ApiTags("participant")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create participant" })
  @ApiResponse({
    status: 201,
    description: "The participant has been created.",
    type: CreateParticipantDto,
  })
  @ApiResponse({
    status: 404,
    description: "User or Trip not found.",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Get all participants" })
  @ApiResponse({
    status: 200,
    description: "A list of participants.",
    type: [CreateParticipantDto],
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.GUIDE, Role.ADMIN)
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(":id")
  @HttpCode(200)
  @ApiOperation({ summary: "Get participant by id" })
  @ApiResponse({
    status: 200,
    description: "The participant with the given id.",
    type: CreateParticipantDto,
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found.",
  })
  @ApiResponse({
    status: 403,
    description: "Access to the requested resource is forbidden.",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findOne(
    @Param("id", ParseIntPipe) id: string,
    @Request()
    request: {
      user: UserMetadata;
    },
  ) {
    const participant = await this.participantService.findOne(+id);
    if (participant === null) {
      throw new NotFoundException("Participant not found");
    }
    if (
      request.user.role === Role.ADMIN ||
      request.user.role === Role.GUIDE ||
      request.user.email === participant.userEmail
    ) {
      return participant;
    }

    throw new UnauthorizedException(
      "You can only access your own participant data",
    );
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete participant by id" })
  @ApiResponse({
    status: 204,
    description: "The participant has been deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found.",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Param("id", ParseIntPipe) id: string,
    @Request()
    request: {
      user: UserMetadata;
    },
  ) {
    const participant = await this.participantService.findOne(+id);
    if (participant === null) {
      throw new NotFoundException("Participant not found");
    }
    if (
      request.user.role === Role.ADMIN ||
      request.user.role === Role.GUIDE ||
      request.user.email === participant.userEmail
    ) {
      return this.participantService.remove(+id);
    }
    throw new UnauthorizedException(
      "You can only delete your own participant data",
    );
  }
}
