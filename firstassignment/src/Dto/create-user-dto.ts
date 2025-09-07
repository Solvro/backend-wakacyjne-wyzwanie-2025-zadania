import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'nazwa użytkowika',})
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'hasło użytkowika'})
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({description: 'email użytkowika',example: "example@example.com"})
    email: string;
}