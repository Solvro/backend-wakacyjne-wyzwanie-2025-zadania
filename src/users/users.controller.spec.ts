/* eslint-disable @typescript-eslint/unbound-method */
import { Role } from "@prisma/client";

import { ForbiddenException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { AuthService } from "../auth/auth.service";
import { RoleGuard } from "../auth/role/role.guard";
import type { ExpenseResponseDto } from "../expenses/dto/expense-response.dto";
import type { TripResponseDto } from "../trips/dto/trip-response.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import type { UserResponseDto } from "./dto/user-response.dto";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      getExpenses: jest.fn(),
      getTrips: jest.fn(),
    };

    const mockAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const mockRoleGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockService },
        { provide: AuthService, useValue: {} },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockRoleGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get(UsersService);
  });

  describe("findAll", () => {
    it("should return all users", async () => {
      const users = [{ email: "test@mail.com" } as UserResponseDto];
      service.findAll.mockResolvedValue(users);
      expect(await controller.findAll()).toBe(users);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a user by email", async () => {
      const user = { email: "test@mail.com" };
      service.findOne.mockResolvedValue(user as UserResponseDto);
      expect(await controller.findOne("test@mail.com")).toBe(user);
      expect(service.findOne).toHaveBeenCalledWith("test@mail.com");
    });

    it("should return null if user not found", async () => {
      service.findOne.mockResolvedValue(null);
      expect(await controller.findOne("test@mail.com")).toBeNull();
    });
  });

  describe("update", () => {
    it("should update user if email matches request user", async () => {
      const dto: UpdateUserDto = { name: "Jakub" };
      const user = { email: "test@mail.com" };
      service.update.mockResolvedValue(user as UserResponseDto);

      const request = {
        user: { email: "test@mail.com", role: Role.USER },
      } as unknown as Request & { user: { email: string; role: Role } };
      expect(await controller.update("test@mail.com", dto, request)).toBe(user);
      expect(service.update).toHaveBeenCalledWith("test@mail.com", dto);
    });

    it("should throw ForbiddenException if email does not match request user", async () => {
      const dto: UpdateUserDto = { name: "Jakub" };
      const request = {
        user: { email: "test2@mail.com", role: Role.USER },
      } as unknown as Request & { user: { email: string; role: Role } };
      await expect(
        controller.update("test@mail.com", dto, request),
      ).rejects.toThrow(ForbiddenException);
      expect(service.update).not.toHaveBeenCalled();
    });
  });

  describe("remove", () => {
    it("should remove user by email", async () => {
      const user = { email: "test@mail.com" };
      service.remove.mockResolvedValue(user as UserResponseDto);
      expect(await controller.remove("test@mail.com")).toBe(user);
      expect(service.remove).toHaveBeenCalledWith("test@mail.com");
    });
  });

  describe("getExpenses", () => {
    it("should return expenses for a user", async () => {
      const expenses = [{ id: 1 }, { id: 2 }];
      service.getExpenses.mockResolvedValue(expenses as ExpenseResponseDto[]);
      expect(await controller.getExpenses("test@mail.com")).toBe(expenses);
      expect(service.getExpenses).toHaveBeenCalledWith("test@mail.com");
    });
  });

  describe("getTrips", () => {
    it("should return trips for a user", async () => {
      const trips = [{ id: 1 }, { id: 2 }];
      service.getTrips.mockResolvedValue(trips as TripResponseDto[]);
      expect(await controller.getTrips("test@mail.com")).toBe(trips);
      expect(service.getTrips).toHaveBeenCalledWith("test@mail.com");
    });
  });
});
