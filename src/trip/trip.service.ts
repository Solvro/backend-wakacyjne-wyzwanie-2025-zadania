import { AuthRole, Prisma, Role } from "@prisma/client";
import { JwtPayload } from "src/common/interfaces/jwt-payload.interface";
import { DatabaseService } from "src/database/database.service";

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(dto: CreateTripDto, user: JwtPayload) {
    return this.prisma.trip.create({
      data: {
        name: dto.name,
        destination: dto.destination ?? null,
        budget: dto.budget == null ? null : new Prisma.Decimal(dto.budget),
        startDate: new Date(dto.startDate),
        endDate: dto.endDate == null ? null : new Date(dto.endDate),
        ...(Array.isArray(dto.participantIds) && dto.participantIds.length > 0
          ? {
              participants: {
                connect: dto.participantIds.map((id) => ({ id })),
              },
            }
          : {}),
        coordinatorEmail: user.sub,
        participants: {
          create: [
            {
              firstName: user.sub,
              lastName: "",
              email: user.sub,
              role: Role.GUIDE,
            },
          ],
        },
      },
      include: {
        participants: true,
        expenses: true,
        coordinator: true,
      },
    });
  }

  async findAll() {
    return this.prisma.trip.findMany({
      include: {
        expenses: true,
        participants: true,
        coordinator: {
          select: {
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        expenses: true,
        participants: true,
        coordinator: {
          select: {
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
    if (trip == null) {
      throw new NotFoundException(`Trip ${String(id)} not found`);
    }
    return trip;
  }

  async update(
    id: number,
    dto: UpdateTripDto,
    user: { sub: string; role: AuthRole },
  ) {
    const trip = await this.prisma.trip.findUnique({ where: { id } });
    if (trip == null) {
      throw new NotFoundException("Trip not found");
    }

    const endDateField =
      "endDate" in dto
        ? { endDate: dto.endDate == null ? null : new Date(dto.endDate) }
        : {};

    if (user.role !== AuthRole.ADMIN && trip.coordinatorEmail !== user.sub) {
      throw new ForbiddenException("You are not allowed to update this trip");
    }

    return this.prisma.trip.update({
      where: { id },
      data: {
        name: dto.name ?? undefined,
        destination: dto.destination ?? undefined,
        budget:
          dto.budget === undefined ? undefined : new Prisma.Decimal(dto.budget),
        startDate:
          dto.startDate === undefined ? undefined : new Date(dto.startDate),
        ...endDateField,
        participants: {
          set: (dto.participantIds ?? []).map((pid) => ({ id: pid })),
        },
      },
      include: { participants: true, expenses: true, coordinator: true },
    });
  }

  async remove(id: number, user: { sub: string; role: AuthRole }) {
    const trip = await this.prisma.trip.findUnique({ where: { id } });
    if (trip == null) {
      throw new NotFoundException("Trip not found");
    }

    if (user.role !== AuthRole.ADMIN && trip.coordinatorEmail !== user.sub) {
      throw new ForbiddenException("You are not allowed to delete this trip");
    }

    await this.prisma.trip.delete({ where: { id } });
    return { success: true };
  }
}
