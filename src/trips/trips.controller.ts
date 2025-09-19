import type { Request } from "express";

import { Body, Controller, Param, Patch, Req, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import type { JwtPayload } from "../auth/jwt.strategy";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { TripResponseDto } from "./dto/trip-response.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripAccessService } from "./trip-access.service";
import { TripIdPipe } from "./trip-id.pipe";
import { TripsService } from "./trips.service";

@ApiTags("Trips")
@ApiBearerAuth()
@Controller("trips")
@UseGuards(JwtAuthGuard)
export class TripsController {
  constructor(
    private readonly trips: TripsService,
    private readonly access: TripAccessService,
  ) {}

  @Patch(":tripId")
  @ApiOperation({
    summary: "Aktualizuje wycieczkę",
    description:
      "Musisz być organizatorem danej wycieczki żeby zmienić jej dane (albo być adminem).",
  })
  @ApiOkResponse({ type: TripResponseDto })
  async update(
    @Param("tripId", TripIdPipe) tripId: number,
    @Body() dto: UpdateTripDto,
    @Req() request: Request & { user: JwtPayload },
  ) {
    return this.trips.updateAs(request.user, tripId, dto);
  }
}
