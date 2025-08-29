import {ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Gender } from "../../generated/prisma";
export class UpdateParticipantDto{

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: 'imie'})
    imie?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: 'nazwisko'})
    nazwisko?: string;

    @IsEnum(Gender)
    @IsOptional()
    @ApiPropertyOptional({description: 'płeć', enum: ["MALE", "FEMALE"]})
    gender?: Gender;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({description: 'Dieta bezmięsna'})
    isVegan?: boolean;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({description: 'Id wycieczki'})
    tripId?: number;
}