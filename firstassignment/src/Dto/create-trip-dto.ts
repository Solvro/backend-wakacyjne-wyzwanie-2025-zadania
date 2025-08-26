import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class CreateTripDto{
    
    @IsNotEmpty()
    @ApiProperty({
        description: 'Początek wycieczki',
        type: Date
    })
    start_date: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Koniec wycieczki',
        type: Date
    })
    end_date: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Lokalizacja',})
    location: string;

}