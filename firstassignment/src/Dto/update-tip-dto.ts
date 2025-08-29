import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
export class UpdateTripDto{
    
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Początek wycieczki',
        type: Date
    })
    start_date?: string;

    @IsOptional()
    @ApiPropertyOptional({
        description: 'Koniec wycieczki',
        type: Date
    })
    end_date?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: 'Lokalizacja',})
    location?: string;

}