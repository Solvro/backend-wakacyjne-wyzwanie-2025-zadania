import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
