import { UserRole } from "@prisma/client";

import type { ExecutionContext } from "@nestjs/common";
import { ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { RoleGuard } from "./user-role.guard";

describe("RoleGuard", () => {
  let guard: RoleGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RoleGuard(reflector);
  });

  it("should allow access if user has required role", () => {
    jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue([UserRole.ADMIN]);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.ADMIN } }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });

  it("should deny access if user lacks required role", () => {
    jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue([UserRole.ADMIN]);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.USER } }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow("Missing privileges");
  });

  it("should allow access if no roles are required", () => {
    jest.spyOn(reflector, "getAllAndOverride");

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.USER } }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });

  it("should handle missing user", () => {
    jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue([UserRole.ADMIN]);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(context)).toThrow();
  });
});
