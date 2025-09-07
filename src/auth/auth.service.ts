import { Role } from "@prisma/client";
import { compare } from "bcrypt";
import * as bcrypt from "bcrypt";
import { ParticipantMetadata } from "src/participant/dto/participant-metadata.dto";
import { ParticipantService } from "src/participant/participant.service";

import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { LoginResponseDto } from "./dto/login-response.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  private tokenPrefix = "token_";

  constructor(private participantService: ParticipantService) {}

  //tu sie wspierałem kolega, bo w docsach nesta bylo z jakims JWT
  async validateToken(token: string): Promise<ParticipantMetadata> {
    const [time, email] = token.split("_");
    if (Date.now() > Number(time) + Number(process.env.EXPIRY_TIME_MS)) {
      throw new Error("Token expired");
    }
    return await this.participantService.findMetadataOrFail(email);
  }

  generateToken(email: string): string {
    const dateNow = Date.now();
    this.tokenPrefix = `${dateNow.toString()}_`;
    const token = `${this.tokenPrefix}${email}`;
    return token;
  }

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    const participant = await this.participantService.findOneByEmail(email);
    if (
      participant === null ||
      !(await compare(password, participant.password).catch(() => false))
    ) {
      throw new UnauthorizedException();
    }
    return { token: this.generateToken(participant.email) };
  }

  async signUp(registerDto: RegisterDto) {
    const saltOrRounds = 10;
    const password = registerDto.password;
    const hash: string = await bcrypt.hash(password, saltOrRounds);

    const email = await this.participantService.findOneByEmail(
      registerDto.email,
    );

    if (email != null) {
      throw new ConflictException("There is already user with this email");
    }

    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException("Enter missing data");
    }

    await this.participantService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hash,
      role: Role.Admin,
    });
  }
}
