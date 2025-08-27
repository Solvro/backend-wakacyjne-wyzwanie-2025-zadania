import { Gender } from "@prisma/client";

export class CreateParticipantDto {
  name: string;
  surname: string;
  age: number;
  tripId: number;
  gender?: Gender;
}
