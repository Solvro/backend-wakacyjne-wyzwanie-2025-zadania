import { compare } from "bcrypt";
import { ParticipantMetadata } from "src/participant/dto/participant-metadata.dto";
import { ParticipantService } from "src/participant/participant.service";

import { Injectable, UnauthorizedException } from "@nestjs/common";

import { LoginResponseDto } from "./dto/login-response.dto";

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
}
