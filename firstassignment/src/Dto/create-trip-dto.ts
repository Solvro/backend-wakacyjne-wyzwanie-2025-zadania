import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
export class CreateTripDto{
    
    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    start_date: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    end_date: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    location: string;


}