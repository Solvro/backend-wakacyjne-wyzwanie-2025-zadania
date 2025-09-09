/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
import { Role } from "@prisma/client";

import type { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import type { RequestWithUser } from "../dto/request-with-user.dto";
import { RoleGuard } from "./role.guard";

describe("RoleGuard", () => {
  let guard: RoleGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RoleGuard(reflector);
  });

  const createMockContext = (
    request: any,
    handler: any = {},
    classRef: any = {},
    // eslint-disable-next-line unicorn/consistent-function-scoping
  ) => {
    return {
      switchToHttp: () => ({ getRequest: () => request }),
      getHandler: () => handler,
      getClass: () => classRef,
    } as ExecutionContext;
  };

  it("powinien pozwolić na dostęp gdy nie wymagane są żadne role", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue([]);
    const context = createMockContext({});
    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });

  it("powinien odmówić dostępu gdy użytkownik nie jest zalogowany", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue([Role.ADMIN]);
    const context = createMockContext({});
    const result = guard.canActivate(context);

    expect(result).toBe(false);
  });

  it("powinien odmówić dostępu gdy użytkownik nie ma wymaganej roli", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue([Role.ADMIN]);
    const request: RequestWithUser = {
      user: { role: Role.USER },
    } as RequestWithUser;
    const context = createMockContext(request);
    const result = guard.canActivate(context);

    expect(result).toBe(false);
  });

  it("powinien pozwolić na dostęp gdy użytkownik ma wymaganą rolę", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue([Role.ADMIN]);
    const request: RequestWithUser = {
      user: { role: Role.ADMIN },
    } as RequestWithUser;
    const context = createMockContext(request);
    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });

  it("powinien pozwolić na dostęp gdy użytkownik ma jedną z wymaganych ról", () => {
    jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue([Role.ADMIN, Role.COORDINATOR]);
    const request: RequestWithUser = {
      user: { role: Role.ADMIN },
    } as RequestWithUser;
    const context = createMockContext(request);
    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });
});
