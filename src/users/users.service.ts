import { Role, User } from "@prisma/client";

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { UserMetadata, userToMetadata } from "./dto/user-metadata.dto";
import { UserUpdateResponseDto } from "./dto/user-update-response.dto";

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findByEmailOrFail(email: string): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (user === null) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async mergeUser(user: User) {
    return await this.databaseService.user.update({
      where: { email: user.email },
      data: { ...user },
    });
  }

  async disableAccount(email: string) {
    const user = await this.findByEmailOrFail(email);
    user.is_enabled = false;
    await this.mergeUser(user);
  }

  async enableAccount(email: string) {
    const user = await this.findByEmailOrFail(email);
    user.is_enabled = true;
    await this.mergeUser(user);
  }

  async findOne(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { email } });
  }

  async findMetadataOrFail(email: string): Promise<UserMetadata> {
    return userToMetadata(await this.findByEmailOrFail(email));
  }

  async updateUserData(
    currentUser: UserMetadata,
    newName: string | undefined,
    newAboutMe: string | undefined,
    targetEmail: string | undefined,
  ): Promise<UserUpdateResponseDto> {
    let user: User;
    if (targetEmail === undefined) {
      user = await this.findByEmailOrFail(currentUser.email);
    } else {
      if (currentUser.role === Role.ADMIN) {
        user = await this.findByEmailOrFail(targetEmail);
      } else {
        throw new ForbiddenException(
          "You don't have permission to update other users' data",
        );
      }
    }
    if (newName !== undefined) {
      user.name = newName;
    }
    if (newAboutMe !== undefined) {
      user.about_me = newAboutMe;
    }
    const updatedUser = await this.mergeUser(user);

    return {
      name: updatedUser.name,
      aboutMe: updatedUser.about_me,
    };
  }

  async create({
    email,
    password,
    name,
    aboutMe,
  }: {
    email: string;
    password: string;
    name?: string;
    aboutMe?: string;
  }) {
    return await this.databaseService.user.create({
      data: {
        email,
        password,
        is_enabled: true,
        name,
        about_me: aboutMe,
        role: Role.USER,
      },
    });
  }
}
