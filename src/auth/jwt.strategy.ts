import { User, UserRole } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    const secret = config.get<string>("JWT_SECRET");
    if (secret == null || secret.length === 0) {
      throw new Error("nie zdefiniowano JWT w zmiennych środowiskowych");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  // jeśli dobrze rozumiem, to tu już nie potrzebuję dodatkowych kroków walidacyjnych, bo zwalidowało się wcześniej
  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
