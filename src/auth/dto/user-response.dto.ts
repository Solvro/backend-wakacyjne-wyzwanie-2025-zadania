import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional({ required: false, example: "Robert123" })
  name?: string;

  @ApiProperty({ enum: ["USER", "COORDINATOR", "ADMIN"] })
  role: string;

  @ApiPropertyOptional({
    required: false,
    example: "User can play on a guitar or something.",
  })
  additionalInfo?: string;
}
