import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
export class UpdateUserDto{

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: 'Nazwa użytkownika'})
    username?: string;
}