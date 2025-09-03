import type { User, $Enums} from "../../generated/prisma/client";

export interface UserMetadata {
    email: string;
    role: $Enums.Role;
}

export function userToMetadata(user: User) {
    return {
        email: user.email,
        role: user.role,
    }
}