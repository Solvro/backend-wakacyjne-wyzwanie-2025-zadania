import type { User } from "@prisma/client";

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Role, hasRole } from "@/lib/roles";

import { PrismaService } from "../prisma/prisma.service";
import { UserMetadata, userToMetadata } from "./dto/user-metadata.dto";
import { UpdateUserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async findMetadataOrFail(id: string): Promise<UserMetadata> {
    return userToMetadata(await this.findByIdOrFail(Number.parseInt(id)));
  }

  async findMetadataByEmailOrFail(email: string): Promise<UserMetadata> {
    return userToMetadata(await this.findByEmailOrFail(email));
  }

  private async findByIdOrFail(id: number): Promise<User> {
    const found = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (found === null) {
      throw new NotFoundException("User not found");
    }
    return found;
  }

  private async findByEmailOrFail(email: string): Promise<User> {
    const found = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (found === null) {
      throw new NotFoundException("User not found");
    }
    return found;
  }

  async updateUser(id: string, body: UpdateUserDto) {
    await this.prismaService.user.update({
      where: { id: Number.parseInt(id) },
      data: {
        ...(body.email != null && { email: body.email }),
        ...(body.password != null && { password: body.password }),
        ...(body.roles != null && { roles: body.roles }),
      },
    });

    return this.findMetadataOrFail(id);
  }

  async updateUserWithAuthorization(
    targetUserId: string,
    body: UpdateUserDto,
    currentUser: UserMetadata,
  ) {
    // Sprawdź czy użytkownik próbuje edytować swoje dane lub czy ma uprawnienia administratora
    const isOwnData = currentUser.id === Number.parseInt(targetUserId);
    const isAdmin = hasRole(currentUser.roles, Role.ADMIN);

    if (!isOwnData && !isAdmin) {
      throw new ForbiddenException(
        "You can only modify your own data or you need admin privileges",
      );
    }

    return await this.updateUser(targetUserId, body);
  }

  async deleteUser(id: string) {
    await this.findByIdOrFail(Number.parseInt(id));
    return await this.prismaService.user.delete({
      where: { id: Number.parseInt(id) },
    });
  }
}
