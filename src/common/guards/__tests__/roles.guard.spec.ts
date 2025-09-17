import type { ExecutionContext } from "@nestjs/common";
import { ForbiddenException } from "@nestjs/common";
import type { Reflector } from "@nestjs/core";

import { RolesGuard } from "../roles.guard";

interface JwtUser {
  role?: "USER" | "ADMIN";
}

function contextWithUser(user: JwtUser | undefined): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
    getHandler: jest.fn(),
    getClass: jest.fn(),
  } as unknown as ExecutionContext;
}

describe("RolesGuard", () => {
  it("przepuszcza gdy nie ma wymaganych ról", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(contextWithUser({ role: "USER" }))).toBe(true);
  });

  it("odrzuca gdy brak usera", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(["ADMIN"]),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);
    expect(() => guard.canActivate(contextWithUser())).toThrow(
      ForbiddenException,
    );
  });

  it("odrzuca gdy rola niewystarczająca", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(["ADMIN"]),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);
    expect(() => guard.canActivate(contextWithUser({ role: "USER" }))).toThrow(
      ForbiddenException,
    );
  });

  it("przepuszcza gdy rola spełnia warunek", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(["ADMIN"]),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(contextWithUser({ role: "ADMIN" }))).toBe(true);
  });
});
