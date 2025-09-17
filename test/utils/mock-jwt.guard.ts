import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class MockJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request.user = { sub: 1, role: "ADMIN" };
    return true;
  }
}
