import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
export class UpdateExpenseDto{

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({description: 'Kwota'})
    amount?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: 'Lokalizacja'})
    location?: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({description: 'Id uczestnika'})
    participantId?: number;
}