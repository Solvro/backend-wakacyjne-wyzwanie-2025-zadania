import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { FutureDate } from "src/validators/future-date.validator";
export class CreateTripDto{
    
    @IsNotEmpty()
    @Validate(FutureDate)
    @ApiProperty({
        description: 'Początek wycieczki',
        type: Date,
        example: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })
    start_date: string;

    @IsNotEmpty()
    @Validate(FutureDate)
    @ApiProperty({
        description: 'Koniec wycieczki',
        type: Date,
        example: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })
    end_date: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Lokalizacja',})
    location: string;

}