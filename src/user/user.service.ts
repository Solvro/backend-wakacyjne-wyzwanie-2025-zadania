import type { User } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { UserMetadata, userToMetadata } from "./dto/user-metadata.dto";
import { UpdateUserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async findMetadataOrFail(email: string): Promise<UserMetadata> {
    return userToMetadata(await this.findByIdOrFail(email));
  }

  private async findByIdOrFail(email: string): Promise<User> {
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
      where: { email: id },
      data: {
        ...(body.email != null && { email: body.email }),
        ...(body.password != null && { password: body.password }),
        ...(body.roles != null && { roles: body.roles }),
      },
    });

    return this.findMetadataOrFail(id);
  }

  async deleteUser(id: string) {
    await this.findByIdOrFail(id);
    return await this.prismaService.user.delete({
      where: { email: id },
    });
  }
}
