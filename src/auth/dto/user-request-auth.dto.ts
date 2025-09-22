import type { Request } from "express";

import type { UserMetadata } from "src/user/dto/metadata-user";

export interface UserRequest extends Request {
  user?: UserMetadata;
}