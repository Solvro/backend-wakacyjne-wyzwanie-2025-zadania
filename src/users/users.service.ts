import { UserRole } from "@prisma/client";

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async updateUser(
    currentUserEmail: string,
    currentUserRole: UserRole,
    targetEmail: string | undefined,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const emailToUpdate = targetEmail ?? currentUserEmail;

    if (
      emailToUpdate !== currentUserEmail &&
      currentUserRole !== UserRole.ADMIN
    ) {
      throw new ForbiddenException("You can only update your own data");
    }

    const targetUser = await this.prisma.user.findUnique({
      where: { email: emailToUpdate },
    });

    if (targetUser === null) {
      throw new NotFoundException("User not found");
    }

    const updatedUser = await this.prisma.user.update({
      where: { email: emailToUpdate },
      data: {
        name: updateUserDto.name,
      },
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
    };
  }
}
