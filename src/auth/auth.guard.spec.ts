/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    } as any;

    guard = new AuthGuard(jwtService);
  });

  function mockContext(authHeader?: string): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: authHeader ? { authorization: authHeader } : {},
        }),
      }),
    } as any;
  }

  it("powinien przepuścić poprawny token", async () => {
    const payload = { sub: "user1", exp: Date.now() + 10_000 };
    (jwtService.verifyAsync as jest.Mock).mockResolvedValue(payload);

    const result = await guard.canActivate(mockContext("Bearer valid.token"));

    expect(result).toBe(true);
  });

  it("powinien wyrzucić błąd gdy brak nagłówka", async () => {
    await expect(guard.canActivate(mockContext())).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it("powinien wyrzucić błąd gdy token wygasł", async () => {
    const payload = { sub: "user1", exp: Date.now() - 1000 };
    (jwtService.verifyAsync as jest.Mock).mockResolvedValue(payload);

    await expect(
      guard.canActivate(mockContext("Bearer expired.token")),
    ).rejects.toThrow("Invalid or expired token");
  });

  it("powinien wyrzucić błąd dla niepoprawnego tokena", async () => {
    (jwtService.verifyAsync as jest.Mock).mockRejectedValue(
      new Error("Invalid token"),
    );

    await expect(
      guard.canActivate(mockContext("Bearer invalid.token")),
    ).rejects.toThrow("Invalid or expired token");
  });
});
