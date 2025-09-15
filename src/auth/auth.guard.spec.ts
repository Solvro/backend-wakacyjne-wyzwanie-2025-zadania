import type { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";

import type { RequestWithUser } from "../auth/dto/request-with-user.dto";
import { AuthGuard } from "./auth.guard";
import type { AuthService } from "./auth.service";

describe("AuthGuard", () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    authService = { validateToken: jest.fn() } as unknown as AuthService;
    guard = new AuthGuard(authService);
  });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const createMockContext = (authorization?: string): ExecutionContext => {
    const request: Partial<RequestWithUser> = {
      headers: authorization == null ? {} : { authorization },
    };
    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
  };

  it("should allow access when token is valid", async () => {
    const mockUser = { id: 1, email: "test@example.com" };
    (authService.validateToken as jest.Mock).mockResolvedValue(mockUser);

    const context = createMockContext("Bearer valid-token");
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
    expect(request.user).toEqual(mockUser);
  });

  it("should throw UnauthorizedException if token is missing", async () => {
    const context = createMockContext();
    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it("should throw UnauthorizedException if token is invalid", async () => {
    (authService.validateToken as jest.Mock).mockRejectedValue(
      new Error("Invalid token"),
    );

    const context = createMockContext("Bearer invalid-token");
    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
