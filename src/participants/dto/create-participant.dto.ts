import { Role } from "@prisma/client";
import { IsEnum, IsInt, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({ description: "Nazwa uczestnika" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Wiek uczestnika" })
  @IsInt()
  age: number;

  @ApiProperty({ enum: Role, description: "Rola uczestnika" })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ description: "ID wycieczki" })
  @IsInt()
  tripId: number;
}
