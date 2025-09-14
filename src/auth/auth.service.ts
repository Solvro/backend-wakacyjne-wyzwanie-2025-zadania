import { compare } from "bcrypt";

import { Injectable, UnauthorizedException } from "@nestjs/common";

import { ParticipantService } from "../participant/participant.service";

@Injectable()
export class AuthService {
  private readonly prefix = "token_";
  private readonly expireTimeMs =
    Number(process.env.EXPIRE_TIME_MS) || 3_600_000;

  constructor(private readonly participantService: ParticipantService) {}

  generateToken(id: number): string {
    const timestamp = Date.now();
    return `${this.prefix}${timestamp.toString()}:${id.toString()}`;
  }

  async validateToken(token: string) {
    if (token.startsWith(this.prefix)) {
      const payload = token.slice(this.prefix.length).split(":");
      const now = Date.now();

      if (now - Number(payload[0]) > this.expireTimeMs) {
        throw new UnauthorizedException("Token expired");
      }
      return await this.participantService.findMetadata(Number(payload[1]));
    }
    throw new UnauthorizedException("Invalid token");
  }

  async login(email: string, password: string) {
    const participant = await this.participantService.findByEmail(email);

    if (
      participant === null ||
      !(await compare(password, participant.password).catch(() => false))
    ) {
      throw new UnauthorizedException();
    }
    return { token: this.generateToken(participant.id) };
  }
}
