import { ConflictException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { DatabaseService } from "../database/database.service";
import { RegisterDto } from "./dto/register.dto";
import { UserStatus } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService) {}

  async register(dto: RegisterDto): Promise<void> {
    const existing = await this.db.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException("Email already in use");
    }

    const password = await bcrypt.hash(dto.password, 12);

    await this.db.user.create({
      data: {
        email: dto.email,
        name: dto.name ?? null,
        password,             
        role: UserStatus.USER, 
        isEnabled: true,       
      },
    });
  }
}
