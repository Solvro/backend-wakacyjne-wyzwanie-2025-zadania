import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { DatabaseService } from "src/database/database.service";

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CreateUserDto } from "./dto/create-dto.user";
import { UserUpdateResponseDto } from "./dto/update-user-response.dto";
import { UserMetadata, userToMetaData } from "./dto/user-metadata";

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}
  async create(createUserDto: CreateUserDto): Promise<Omit<User, "password">> {
    const { email, password, ...userData } = createUserDto;
    const existingUser = await this.database.user.findUnique({
      where: { email },
    });
    if (existingUser !== null) {
      throw new ConflictException(
        "Istnieje już użytkownik przypisany do tego emaila",
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const hashedPassword: string = await hash(password, 10);
    const user = await this.database.user.create({
      data: {
        email,
        password: hashedPassword,
        ...userData,
      },
      select: {
        email: true,
        about_me: true,
        is_enabled: true,
        name: true,
        surname: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
  async findOne(email: string): Promise<User> {
    const user = await this.database.user.findUnique({ where: { email } });
    if (user === null) {
      throw new NotFoundException("Nie ma użytkownika o podanym adresie ");
    }
    return user;
  }
  async findMetaData(email: string): Promise<UserMetadata> {
    return userToMetaData(await this.findOne(email));
  }
  async updateUserData(
    email: string,
    newAboutMe?: string | null,
    name?: string | null,
  ): Promise<UserUpdateResponseDto> {
    const user = await this.database.user.findUnique({ where: { email } });

    if (user == null) {
      throw new NotFoundException("Użytkownik o podanym emailu nie istnieje");
    }

    const updatedUser = await this.database.user.update({
      where: { email },
      data: {
        about_me: newAboutMe ?? user.about_me,
        name: name ?? user.name,
      },
    });

    return {
      email: updatedUser.email,
      name: updatedUser.name,
      aboutMe: updatedUser.about_me,
    };
  }
}
