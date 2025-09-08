import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserRequest } from "./user-request.dto";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: UserRequest = context.switchToHttp().getRequest();

    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    if (type !== "Bearer") {
      throw new UnauthorizedException("Missing token");
    }

    try {
      request.user = await this.authService.validateToken(token);
    } catch (error) {
      throw new UnauthorizedException((error as Error).message);
    }

    return true;
  }
}
