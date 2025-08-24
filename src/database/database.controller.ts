import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { DatabaseService } from "./database.service";

@Controller("database")
@ApiTags("database")
export class DatabaseController {
  constructor(private readonly prisma: DatabaseService) {}

  // @Get("trips")
  // async getAllTrips(): Promise<Trip[]> {
  //   return await this.prisma.trip.findMany();
  // }

  // // todo: CreateParticipantDTO
  // @Post("participants")
  // async createParticipant(
  //   @Body()
  //   data: {
  //     first_name: string;
  //     last_name: string;
  //     address: string;
  //     phone_number: string;
  //     sex: Sex;
  //   },
  // ): Promise<Participant> {
  //   return await this.prisma.participant.create({ data });
  // }
}
