import type { Request } from "express";

import type { UserMetadata } from "../../users/dto/user-metadata";

export interface UserRequest extends Request {
  user?: UserMetadata;
}
