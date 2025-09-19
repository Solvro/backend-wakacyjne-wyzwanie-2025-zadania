import type { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { RolesGuard } from "./roles.guard";

describe("RolesGuard", () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesGuard, Reflector],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });

  describe("canActivate", () => {
    let mockExecutionContext: ExecutionContext;
    let mockRequest: { user: { id: number; role: string } };

    beforeEach(() => {
      mockRequest = {
        user: {
          id: 1,
          role: "admin",
        },
      };

      mockExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
        getHandler: jest.fn(),
        getClass: jest.fn(),
      } as unknown as ExecutionContext;
    });

    it("should return true when user has required role", () => {
      jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(["admin"]);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith("roles", [
        mockExecutionContext.getHandler(),
        mockExecutionContext.getClass(),
      ]);
    });

    it("should return false when user does not have required role", () => {
      jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(["user"]);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(false);
    });

    it("should return false when user has different role", () => {
      mockRequest.user.role = "user";
      jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(["admin"]);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(false);
    });

    it("should return true when user has one of multiple required roles", () => {
      jest
        .spyOn(reflector, "getAllAndOverride")
        .mockReturnValue(["admin", "moderator"]);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
    });

    it("should return false when user role is not in multiple required roles", () => {
      mockRequest.user.role = "user";
      jest
        .spyOn(reflector, "getAllAndOverride")
        .mockReturnValue(["admin", "moderator"]);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(false);
    });

    it("should handle empty required roles array", () => {
      jest.spyOn(reflector, "getAllAndOverride").mockReturnValue([]);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(false);
    });

    it("should handle undefined required roles", () => {
      jest.spyOn(reflector, "getAllAndOverride").mockReturnValue([]);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(false);
    });
  });
});
