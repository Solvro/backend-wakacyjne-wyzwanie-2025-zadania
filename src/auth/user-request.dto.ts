import type { Request } from "express";

import type { UserMetadata } from "../user/metadata-user";

export interface UserRequest extends Request {
  user?: UserMetadata;
}
