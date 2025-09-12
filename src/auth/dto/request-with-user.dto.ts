import type { Request } from "express";

import type { UserMetadata } from "../../user/dto/user-metadata";

export interface RequestWithUser extends Request {
  user?: UserMetadata;
}
