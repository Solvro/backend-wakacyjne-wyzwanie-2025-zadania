import type { Request } from "express";
import type { UserMetadata } from "src/users/dto/user-metadata.dto";

export interface RequestWithUser extends Request {
  user?: UserMetadata;
}
