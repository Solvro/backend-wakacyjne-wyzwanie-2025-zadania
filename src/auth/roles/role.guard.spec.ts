import type { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { Role } from "@/lib/roles";

import { ROLES_KEY } from "./role.decorator";
import { RoleGuard } from "./role.guard";

interface MockUser {
  id: number;
  email: string;
  roles: string;
}

const createMockExecutionContext = (user?: MockUser): ExecutionContext => {
  const request = {
    user,
  };

  return {
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: jest.fn(),
      getNext: jest.fn(),
    }),
    getHandler: jest.fn(),
    getClass: jest.fn(),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn(),
  } as unknown as ExecutionContext;
};

describe("RoleGuard", () => {
  let guard: RoleGuard;
  let reflector: jest.Mocked<Reflector>;

  // Helper function to set up test with user and required roles
  const setupTest = (
    user?: MockUser,
    requiredRoles: (typeof Role)[keyof typeof Role][] = [],
  ) => {
    const context = createMockExecutionContext(user);
    const getAllAndOverrideSpy = jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue(requiredRoles);

    return { context, getAllAndOverrideSpy };
  };

  beforeEach(async () => {
    const mockReflector = {
      getAllAndOverride: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleGuard,
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    guard = module.get<RoleGuard>(RoleGuard);
    reflector = module.get(Reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("canActivate", () => {
    it("should allow access when no roles are required", () => {
      const { context, getAllAndOverrideSpy } = setupTest();

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it("should allow access when user has required role", () => {
      const user: MockUser = {
        id: 1,
        email: "admin@example.com",
        roles: "10000", // ADMIN role (position 0)
      };
      const { context, getAllAndOverrideSpy } = setupTest(user, [Role.ADMIN]);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it("should allow access when user has one of multiple required roles", () => {
      const user: MockUser = {
        id: 1,
        email: "moderator@example.com",
        roles: "01000", // MODERATOR role (position 1)
      };
      const { context, getAllAndOverrideSpy } = setupTest(user, [
        Role.ADMIN,
        Role.MODERATOR,
      ]);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it("should allow access when user has multiple roles including required one", () => {
      const user: MockUser = {
        id: 1,
        email: "superuser@example.com",
        roles: "11100", // ADMIN, MODERATOR, and USER roles
      };
      const { context, getAllAndOverrideSpy } = setupTest(user, [Role.USER]);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it("should deny access when user is undefined", () => {
      const { context, getAllAndOverrideSpy } = setupTest(undefined, [
        Role.USER,
      ]);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it("should deny access when user roles is not a string", () => {
      const userWithNullRoles = {
        id: 1,
        email: "user@example.com",
        roles: null as unknown as string,
      };
      const { context, getAllAndOverrideSpy } = setupTest(userWithNullRoles, [
        Role.USER,
      ]);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it("should deny access when user roles is an empty string", () => {
      const user: MockUser = {
        id: 1,
        email: "user@example.com",
        roles: "",
      };
      const { context, getAllAndOverrideSpy } = setupTest(user, [Role.USER]);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it("should deny access when user does not have required role", () => {
      const user: MockUser = {
        id: 1,
        email: "guest@example.com",
        roles: "00010", // GUEST role (position 3)
      };
      const { context, getAllAndOverrideSpy } = setupTest(user, [Role.ADMIN]);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it("should deny access when user has no required roles from multiple options", () => {
      const user: MockUser = {
        id: 1,
        email: "guest@example.com",
        roles: "00010", // GUEST role (position 3)
      };
      const { context, getAllAndOverrideSpy } = setupTest(user, [
        Role.ADMIN,
        Role.MODERATOR,
        Role.TRIP_COORDINATOR,
      ]);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it("should handle edge case with shorter role string", () => {
      const user: MockUser = {
        id: 1,
        email: "user@example.com",
        roles: "1", // Only one character, should work for ADMIN role
      };
      const { context, getAllAndOverrideSpy } = setupTest(user, [Role.ADMIN]);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it("should handle role string with all zeros", () => {
      const user: MockUser = {
        id: 1,
        email: "user@example.com",
        roles: "00000", // No roles assigned
      };
      const { context, getAllAndOverrideSpy } = setupTest(user, [Role.USER]);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });
  });
});
