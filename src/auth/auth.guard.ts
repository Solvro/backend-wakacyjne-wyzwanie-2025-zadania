import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { RequestWithUser } from "./dto/auth.dto";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (token === undefined) {
      throw new UnauthorizedException("Missing token");
    }
    try {
      request.user = await this.authService.validateToken(token);
    } catch (error) {
      throw new UnauthorizedException((error as Error).message);
    }
    return true;
  }

  private extractTokenFromHeader(request: RequestWithUser): string | undefined {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const authorization = request.headers["authorization"] as
      | string
      | undefined;
    if (authorization === undefined) {
      return undefined;
    }
    const [type, token] = authorization.split(" ");
    return type === "Bearer" ? token : undefined;
  }
}

// const user = request.user

// if(user === undefined) {
//   return false
// }

// const hasEmail = typeof user.email === 'string' && user.email.length > 0
// const hasRoles = typeof user.roles === 'string' && user.roles.length > 0

// if(!hasEmail || !hasRoles) {
//   return false
// }

// const rolesPattern = /^[01]+$/
// if(!rolesPattern.test(user.roles)) {
//   return false
// }
