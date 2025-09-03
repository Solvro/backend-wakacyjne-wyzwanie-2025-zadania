import { ApiProperty } from "@nestjs/swagger";

export class SignInResponseDto {
  @ApiProperty({
    description: "JWT access token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  access_token: string;

  @ApiProperty({
    description: "User information",
    example: {
      id: 1,
      username: "johndoe",
      email: "john@example.com",
      role: "user",
    },
  })
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };

  @ApiProperty({
    description: "Token expiration time in seconds",
    example: 8640,
  })
  expires_in: number;

  @ApiProperty({
    description: "Token type",
    example: "Bearer",
  })
  token_type: string;
}
