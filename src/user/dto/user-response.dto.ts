import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({
    description: "User ID",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "Username",
    example: "johndoe",
  })
  username: string;

  @ApiProperty({
    description: "Email address",
    example: "john@example.com",
  })
  email: string;

  @ApiProperty({
    description: "User role",
    example: "user",
    enum: ["user", "coordinator", "admin"],
  })
  role: string;
}
