import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Gender } from "../../generated/prisma";
export class CreateParticipantDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'imie'})
    imie: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'nazwisko'})
    nazwisko: string;

    @IsEnum(Gender)
    @ApiProperty({description: 'płeć', enum: ["MALE", "FEMALE"]})
    @IsOptional()
    gender: Gender;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({description: 'Dieta bezmięsna'})
    isVegan: boolean;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: 'Id wycieczki'})
    tripId: number;
}