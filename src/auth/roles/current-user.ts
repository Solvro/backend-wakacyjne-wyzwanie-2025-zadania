import type { User } from "@prisma/client";

import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";

interface RequestWithUser extends Request {
  user?: User;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User | undefined => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
