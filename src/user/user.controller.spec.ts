import { Role } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserController", () => {
  let controller: UserController;

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
  const mockUserService = {
    create: jest.fn(({ data }: User) => {
      const newUser = { email: `placeholder${String(userCounter++)}`, ...data };
      usersInMemory.push(newUser);
      return newUser;
    }) as jest.Mock,
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    enableUser: jest.fn(),
    disableUser: jest.fn(),
  };

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    usersInMemory = [...initialUsers];
    userCounter = initialUsers.length + 1;

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a user", async () => {
    const dto = {
      email: `placeholder${String(userCounter++)}`,
      aboutMe: "placeholder",
      password: "placeholder",
      role: Role.ADMIN,
      isEnabled: true,
      name: "placeholder",
    };

    const expectedValue = { ...dto };
    mockUserService.create.mockResolvedValue(expectedValue);

    const result = await controller.create(dto);

    expect(result).toEqual(expectedValue);

    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all users", async () => {
    const usersMock = [...usersInMemory];

    mockUserService.findAll.mockResolvedValue(usersMock);

    const result = await controller.findAll();

    expect(result).toEqual(usersMock);
    expect(mockUserService.findAll).toHaveBeenCalledTimes(1);
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

    mockUserService.findOne.mockResolvedValue(userMock);
    const result = await controller.findOne(userMock.email);

    expect(result).toEqual(userMock);
    expect(mockUserService.findOne).toHaveBeenCalledTimes(1);
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
    const userMock = await controller.create(dto);

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

    mockUserService.update.mockResolvedValue(userUpdated);

    const result = await controller.update(userMock.email, dtoUpdate, {
      id: userMock.email,
      role: Role.ADMIN,
    });

    expect(mockUserService.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userUpdated);
    expect(mockUserService.update).toHaveBeenCalledWith(
      "placeholder3",
      dtoUpdate,
    );
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

    mockUserService.remove.mockResolvedValue(userMock);

    const result = await controller.remove(userMock.email);

    expect(result).toEqual(userMock);
    expect(mockUserService.remove).toHaveBeenCalled();
    expect(mockUserService.remove).toHaveBeenCalledWith(userMock.email);
  });
});
