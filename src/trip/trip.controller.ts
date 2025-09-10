import { Role } from "@prisma/client";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/role.guard";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

@ApiTags("Trips")
@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tworzy nową wycieczkę" })
  @ApiCreatedResponse({
    description: "Nowa wycieczka została stworzona",
    type: CreateTripDto,
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: "Zwraca wszystkie wycieczki" })
  @ApiOkResponse({ description: "Wycieczki zostały zwrócone" })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Zwraca wycieczkę od id " })
  @ApiOkResponse({ description: "Dana wycieczka została zwrócona " })
  async findOne(@Param("id") id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Aktualizuję daną wycieczkę od id " })
  @ApiOkResponse({ description: "Wycieczka została zaktualizowana" })
  async update(@Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.COORDINATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Usuwa wycieczkę od id" })
  @ApiNoContentResponse({ description: "Dana wycieczka została usunięta" })
  async remove(@Param("id") id: string) {
    return this.tripService.remove(+id);
  }
}
