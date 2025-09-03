import { Strategy } from "passport-custom";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { AuthService } from "../auth.service";

interface RequestWithUser {
  headers: {
    authorization?: string;
  };
}

interface UserPayload {
  id: number;
  username: string;
  email: string;
  role: string;
}

@Injectable()
export class CustomTokenStrategy extends PassportStrategy(
  Strategy,
  "custom-token",
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(request: RequestWithUser): Promise<UserPayload> {
    const authHeader = request.headers.authorization;

    if (authHeader?.startsWith("Bearer ") !== true) {
      throw new UnauthorizedException("No token provided");
    }

    const token = authHeader.slice(7);

    try {
      const user = await this.authService.validateToken(token);
      return user;
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
