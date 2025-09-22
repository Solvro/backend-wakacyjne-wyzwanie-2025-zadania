import { Role } from "@prisma/client";

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/role.guard";
import { TripSummaryResponseDto } from "./dto/summary-response.dto";
import { SummaryService } from "./summary.service";

@ApiTags("summary")
@Controller("summary")
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get("trip/:id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get trip summary",
    description: "Calculate and return summary for a trip",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Trip ID",
  })
  @ApiResponse({
    status: 200,
    description: "Trip summary calculated successfully",
    type: TripSummaryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found",
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TRIPCOORD, Role.USER)
  @ApiBearerAuth("access-token")
  async getTripSummary(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<TripSummaryResponseDto> {
    return this.summaryService.calculateSummary(id);
  }
}
