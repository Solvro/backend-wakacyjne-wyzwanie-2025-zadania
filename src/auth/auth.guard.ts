import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginResponseDto } from "./dto/response-login.dto";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: LoginResponseDto = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization ?? "";
    const spaceIndex = authHeader.indexOf(" ");

    const type = spaceIndex !== -1 ? authHeader.substring(0, spaceIndex) : "";
    const token = spaceIndex !== -1 ? authHeader.substring(spaceIndex + 1) : "";

    if (type !== "Bearer") {
      throw new UnauthorizedException("Missing token");
    }
    await this.authService.validateToken(token);

    return true;
  }
}
