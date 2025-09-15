import type { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";

import { AuthGuard } from "./auth.guard";
import type { AuthService } from "./auth.service";
import type { RequestWithUser } from "./dto/request-with-user.dto";

function createExecutionContext(
  headers: Record<string, string | undefined>,
): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ headers }) as RequestWithUser,
    }),
  } as ExecutionContext;
}

describe("AuthGuard", () => {
  let guard: AuthGuard;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    authService = {
      validateToken: jest.fn(),
    };

    guard = new AuthGuard(authService as AuthService);
  });

  it("should throw UnauthorizedException if token is missing", async () => {
    const context = createExecutionContext({});

    await expect(guard.canActivate(context)).rejects.toThrow(
      new UnauthorizedException("Missing token"),
    );
  });
});
