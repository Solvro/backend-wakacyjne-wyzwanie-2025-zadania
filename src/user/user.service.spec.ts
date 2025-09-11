import { Role } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;

  let userCounter = 1;

  let usersInMemory: {
    email: string;
    aboutMe: string;
    password: string;
    role: Role;
    isEnabled: boolean;
    name: string;
  }[] = [];

  const initialUsers = [
    {
      email: "123@wp.pl",
      aboutMe: "placeholder",
      password: "placeholder",
      role: Role.ADMIN,
      isEnabled: true,
      name: "placeholder",
    },
    {
      email: "123@31231.pl",
      aboutMe: "placeholder",
      password: "placeholder",
      role: Role.ADMIN,
      isEnabled: true,
      name: "placeholder",
    },
  ];

  interface User {
    data: {
      aboutMe: string;
      password: string;
      role: Role;
      isEnabled: boolean;
      name: string;
    };
  }

  const mockDatabaseService = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(({ data }: User) => {
        const newUser = {
          email: `placeholder${String(userCounter++)}`,
          ...data,
        };
        usersInMemory.push(newUser);
        return newUser;
      }),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    usersInMemory = [...initialUsers];
    userCounter = initialUsers.length + 1;

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new user", async () => {
    const dto = {
      email: `placeholder${String(userCounter++)}`,
      aboutMe: "placeholder",
      password: "placeholder",
      role: Role.ADMIN,
      isEnabled: true,
      name: "placeholder",
    };
    const result = await service.create(dto);

    expect(result).toHaveProperty("email");

    expect(result.role).toBe(Role.ADMIN);

    expect(result).toEqual(dto);
  });

  it("should return list of all users", async () => {
    const usersMock = [...usersInMemory];
    mockDatabaseService.user.findMany.mockResolvedValue(usersMock);
    const result = await service.findAll();

    expect(result).toEqual(usersMock);
    expect(mockDatabaseService.user.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return one user", async () => {
    const userMock = {
      email: `placeholder${String(userCounter++)}`,
      aboutMe: "placeholder",
      password: "placeholder",
      role: Role.ADMIN,
      isEnabled: true,
      name: "placeholder",
    };

    mockDatabaseService.user.findUnique.mockResolvedValue(userMock);
    const result = await service.findOne(userMock.email);

    expect(result).toEqual(userMock);
    expect(mockDatabaseService.user.findUnique).toHaveBeenCalledTimes(1);
  });

  it("should update a user", async () => {
    const dto = {
      email: `placeholder${String(userCounter++)}`,
      aboutMe: "placeholder",
      password: "placeholder",
      role: Role.ADMIN,
      isEnabled: true,
      name: "placeholder",
    };
    const userMock = await service.create(dto);

    const userUpdated = {
      email: userMock.email,
      aboutMe: "placeholder",
      password: "placeholder",
      role: Role.COORDINATOR,
      isEnabled: true,
      name: "placeholder",
    };

    const dtoUpdate = {
      name: "xyz",
    };

    mockDatabaseService.user.update.mockResolvedValue(userUpdated);

    const result = await service.update(userMock.email, dtoUpdate);

    expect(mockDatabaseService.user.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userUpdated);
    expect(mockDatabaseService.user.update).toHaveBeenCalledWith({
      where: { email: userMock.email },
      data: dtoUpdate,
    });
  });

  it("should delete a user", async () => {
    const userMock = {
      email: `placeholder${String(userCounter++)}`,
      aboutMe: "placeholder",
      password: "placeholder",
      role: Role.COORDINATOR,
      isEnabled: true,
      name: "placeholder",
    };

    mockDatabaseService.user.delete.mockResolvedValue(userMock);

    const result = await service.remove(userMock.email);

    expect(result).toEqual(userMock);
    expect(mockDatabaseService.user.delete).toHaveBeenCalled();
    expect(mockDatabaseService.user.delete).toHaveBeenCalledWith({
      where: { email: userMock.email },
    });
  });

  it("should throw NotFoundException when user not found", async () => {
    mockDatabaseService.user.findUnique.mockResolvedValue(null);

    await expect(service.findOne("999")).rejects.toThrow(NotFoundException);
  });

  it("should enable user", async () => {
    const email = "test@example.com";
    const mockUser = {
      email,
      isEnabled: false,
      password: "pass",
      role: Role.USER,
      name: null,
      aboutMe: null,
    };

    mockDatabaseService.user.findUnique.mockResolvedValue(mockUser);
    await service.enableUser(email);

    expect(mockUser.isEnabled).toBe(true);
  });

  it("should disable user", async () => {
    const email = "test@example.com";
    const mockUser = {
      email,
      isEnabled: true,
      password: "pass",
      role: Role.USER,
      name: null,
      aboutMe: null,
    };

    mockDatabaseService.user.findUnique.mockResolvedValue(mockUser);
    await service.disableUser(email);

    expect(mockUser.isEnabled).toBe(false);
  });
});
