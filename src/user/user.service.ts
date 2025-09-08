import { User } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { UserMetadata, userToMetadata } from "./dto/user-metadata";

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}
  
  async findOne(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { email } });
  }

  async findMetadataOrFail(email: string): Promise<UserMetadata> {
    return userToMetadata(await this.findByIdOrFail(email));
  }


  private async findByIdOrFail(email: string): Promise<User> {
    const found = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (found === null) {
      throw new NotFoundException("User not found");
    }
    return found;
  }
}