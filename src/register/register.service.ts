import * as bcrypt from "bcrypt";
import { DatabaseService } from "src/database/database.service";

import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";

import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class RegisterService {
  constructor(private database: DatabaseService) {}

  async signUp(registerDto: RegisterDto) {
    const saltOrRounds = 10;
    const password = registerDto.password;
    const hash: string = await bcrypt.hash(password, saltOrRounds);

    const email = await this.database.participant.findFirst({
      where: { email: registerDto.email },
    });

    if (email != null) {
      throw new ConflictException("There is already user with this email");
    }

    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException("Enter missing data");
    }

    await this.database.participant.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hash,
        role: "Participant",
      },
    });
  }
}
