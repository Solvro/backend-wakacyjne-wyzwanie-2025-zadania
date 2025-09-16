import { Role } from "@prisma/client";

import type { ExecutionContext } from "@nestjs/common";
import {
  ForbiddenException,
  InternalServerErrorException,
} from "@nestjs/common";
import type { Reflector } from "@nestjs/core";

import { RolesGuard } from "./roles.guard";

describe("RolesGuard", () => {
  let guard: RolesGuard;
  const reflector = { getAllAndOverride: jest.fn() } as unknown as Reflector;

  beforeEach(() => {
    guard = new RolesGuard(reflector);
  });

  it("returns true when no required roles metadata", () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(null);
    const context = {
      getHandler: () => null,
      getClass: () => null,
    } as unknown as ExecutionContext;
    expect(guard.canActivate(context)).toBe(true);
  });

  it("throws InternalServerErrorException when user missing", () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue([Role.ADMIN]);
    const context = {
      getHandler: () => null,
      getClass: () => null,
      switchToHttp: () => ({ getRequest: () => ({}) }),
    } as unknown as ExecutionContext;
    expect(() => guard.canActivate(context)).toThrow(
      InternalServerErrorException,
    );
  });

  it("returns true when user has role", () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue([Role.COORDINATOR]);
    const context = {
      getHandler: () => null,
      getClass: () => null,
      switchToHttp: () => ({
        getRequest: () => ({ user: { email: "a", role: Role.COORDINATOR } }),
      }),
    } as unknown as ExecutionContext;
    expect(guard.canActivate(context)).toBe(true);
  });

  it("throws ForbiddenException when user lacks role", () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue([Role.ADMIN]);
    const context = {
      getHandler: () => null,
      getClass: () => null,
      switchToHttp: () => ({
        getRequest: () => ({ user: { email: "a", role: Role.USER } }),
      }),
    } as unknown as ExecutionContext;
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
