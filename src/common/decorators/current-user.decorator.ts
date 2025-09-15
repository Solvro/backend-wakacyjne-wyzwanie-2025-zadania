import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ user?: unknown }>();
    return request.user;
  },
);
