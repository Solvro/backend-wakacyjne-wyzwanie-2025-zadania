import type { Request } from "express";

import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";

import type { JwtPayload } from "../../auth/jwt.strategy";

export type JwtUser = Pick<JwtPayload, "sub" | "email" | "role">;

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: JwtUser }>();
    return request.user;
  },
);
