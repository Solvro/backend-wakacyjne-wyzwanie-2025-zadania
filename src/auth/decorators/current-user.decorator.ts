import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";

interface RequestWithUser {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
