import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateExpenseDto{

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: 'Kwota'})
    amount: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Lokalizacja'})
    location: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: 'Id uczestnika'})
    participantId: number;
}