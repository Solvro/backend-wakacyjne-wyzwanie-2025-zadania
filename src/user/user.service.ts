import { compare, hash } from "bcrypt";

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

interface CurrentUser {
  id: number;
  role: string;
}

interface UserWithToken {
  id: number;
  username: string;
  email: string;
  role: string;
  tokenExpiry?: Date;
}

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingEmail = await this.database.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingEmail !== null) {
      throw new ConflictException("Email already exists");
    }

    const existingUsername = await this.database.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (existingUsername !== null) {
      throw new ConflictException("Username already exists");
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    const user = await this.database.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByUsername(username: string) {
    return this.database.user.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string) {
    return this.database.user.findUnique({
      where: { email },
    });
  }

  async findAll() {
    const users = await this.database.user.findMany();
    return users.map(({ password, ...user }) => user);
  }

  async findOne(id: number) {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (user == null) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: CurrentUser,
  ) {
    const userToUpdate = await this.findOne(id);

    if (currentUser.id !== id && currentUser.role !== "admin") {
      throw new ForbiddenException("You can only update your own profile");
    }

    if (
      updateUserDto.email != null &&
      updateUserDto.email !== userToUpdate.email
    ) {
      const existingEmail = await this.findByEmail(updateUserDto.email);
      if (existingEmail !== null && existingEmail.id !== id) {
        throw new ConflictException("Email already exists");
      }
    }

    if (
      updateUserDto.username != null &&
      updateUserDto.username !== userToUpdate.username
    ) {
      const existingUsername = await this.findByUsername(
        updateUserDto.username,
      );
      if (existingUsername !== null && existingUsername.id !== id) {
        throw new ConflictException("Username already exists");
      }
    }

    if (updateUserDto.password != null && updateUserDto.password.length > 0) {
      updateUserDto.password = await hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.database.user.update({
      where: { id },
      data: updateUserDto,
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: number, currentUser: CurrentUser) {
    await this.findOne(id);

    if (currentUser.id !== id && currentUser.role !== "admin") {
      throw new ForbiddenException("You can only delete your own profile");
    }

    await this.database.user.delete({
      where: { id },
    });

    return { message: "User deleted successfully" };
  }

  async validateUser(username: string, password: string) {
    const user = await this.database.user.findUnique({
      where: { username },
    });

    if (user === null) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }

  async canModifyTrip(userId: number, _tripId: number): Promise<boolean> {
    const user = await this.findOne(userId);

    if (user.role === "admin") {
      return true;
    }

    if (user.role === "coordinator") {
      return true;
    }

    return false;
  }

  async saveUserToken(
    userId: number,
    token: string,
    expiryDate: Date,
  ): Promise<void> {
    await this.database.userToken.deleteMany({
      where: { userId },
    });

    await this.database.userToken.create({
      data: {
        userId,
        token,
        expiresAt: expiryDate,
      },
    });
  }

  async findUserByToken(token: string): Promise<UserWithToken | null> {
    const userToken = await this.database.userToken.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (userToken == null) {
      return null;
    }

    return {
      ...userToken.user,
      tokenExpiry: userToken.expiresAt,
    };
  }

  async removeUserToken(token: string): Promise<void> {
    await this.database.userToken.deleteMany({
      where: { token },
    });
  }
}
