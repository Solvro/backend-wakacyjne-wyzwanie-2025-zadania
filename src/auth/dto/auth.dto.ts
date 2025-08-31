import type { UserMetadata } from "@/src/user/dto/user-metadata.dto";

export class UserSignupDto {
  email: string;
  password: string;
}

export class RequestWithUser extends Request {
  user?: UserMetadata;
}
