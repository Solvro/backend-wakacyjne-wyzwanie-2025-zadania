import { Expose } from "class-transformer";

export class UserResponseDto {
  @Expose() id: number;
  @Expose() email: string;
  @Expose() role: "USER" | "ADMIN";
  @Expose() createdAt: Date;
}
