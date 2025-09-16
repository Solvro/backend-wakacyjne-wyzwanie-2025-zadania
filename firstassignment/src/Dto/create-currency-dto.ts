import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateCurrencyDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Nazwa'})
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: 'Stosunek'})
    rate: number;
}