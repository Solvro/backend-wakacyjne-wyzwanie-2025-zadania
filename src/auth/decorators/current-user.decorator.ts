import type { Request } from "express";

import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";

import type { UserResponseDto } from "../../users/dto/user-response.dto";

declare module "express" {
  interface Request {
    user?: UserResponseDto;
  }
}

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user;
  },
);
