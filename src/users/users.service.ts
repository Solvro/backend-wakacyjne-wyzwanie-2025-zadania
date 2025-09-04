import { Injectable, NotFoundException } from "@nestjs/common";

import { ExpenseResponseDto } from "../expenses/dto/expense-response.dto";
import { PrismaService } from "../prisma/prisma.service";
import { TripResponseDto } from "../trips/dto/trip-response.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserMetadata, userToMetadata } from "./dto/user-metadata";
import { UserResponseDto } from "./dto/user-response.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    return await this.prisma.user.create({ data: dto });
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(email: string): Promise<UserResponseDto | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(email: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    return await this.prisma.user.update({ where: { email }, data: dto });
  }

  async remove(email: string): Promise<UserResponseDto> {
    return await this.prisma.user.delete({ where: { email } });
  }

  async getExpenses(email: string): Promise<ExpenseResponseDto[]> {
    const expenses = await this.prisma.expense.findMany({
      where: { user_email: email },
    });
    return expenses.map((expense) => ({
      ...expense,
      amount: expense.amount.toNumber(),
    }));
  }

  async getTrips(email: string): Promise<TripResponseDto[]> {
    return await this.prisma.trip.findMany({
      where: {
        participants: {
          some: { user_email: email },
        },
      },
    });
  }

  async findMetadataOrFail(email: string): Promise<UserMetadata> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user === null) {
      throw new NotFoundException("User not found");
    }
    return userToMetadata(user);
  }
}
