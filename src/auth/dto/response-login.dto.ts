import type { Request } from "express";

import type { UserMetadata } from "../../user/dto/user-metadata";

export interface LoginResponseDto extends Request {
  user?: UserMetadata;
}
