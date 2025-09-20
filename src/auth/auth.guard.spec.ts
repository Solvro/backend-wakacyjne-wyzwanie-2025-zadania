import { UnauthorizedException } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

const createMockExecutionContext = (
  authorization?: string,
): ExecutionContext => {
  const request = {
    headers: {
      authorization,
    },
    user: undefined,
  };

  return {
    switchToHttp: () => ({
      getRequest: () => request,
    }),
  } as ExecutionContext;
};

describe("AuthGuard", () => {
  let guard: AuthGuard;
  let authService: jest.Mocked<AuthService>;

  const mockUserMetadata = {
    id: 1,
    email: "test@example.com",
    roles: "00100", // USER role
  };

  beforeEach(async () => {
    const mockAuthService = {
      validateToken: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("canActivate", () => {
    it("should allow access with valid Bearer token", async () => {
      const token = "valid-token";
      const context = createMockExecutionContext(`Bearer ${token}`);
      const validateTokenSpy = jest
        .spyOn(authService, "validateToken")
        .mockResolvedValue(mockUserMetadata);

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
      expect(validateTokenSpy).toHaveBeenCalledWith(token);
    });

    it("should throw UnauthorizedException when authorization header is empty", async () => {
      const context = createMockExecutionContext("");
      const validateTokenSpy = jest.spyOn(authService, "validateToken");

      await expect(guard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException("Missing token"),
      );
      expect(validateTokenSpy).not.toHaveBeenCalled();
    });

    it("should throw UnauthorizedException when authorization type is not Bearer", async () => {
      const context = createMockExecutionContext("Basic dGVzdA==");
      const validateTokenSpy = jest.spyOn(authService, "validateToken");

      await expect(guard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException("Missing token"),
      );
      expect(validateTokenSpy).not.toHaveBeenCalled();
    });

    it("should throw UnauthorizedException when Bearer token is missing", async () => {
      const context = createMockExecutionContext("Bearer");
      const validateTokenSpy = jest.spyOn(authService, "validateToken");

      await expect(guard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException("Missing token"),
      );
      expect(validateTokenSpy).not.toHaveBeenCalled();
    });

    it("should throw UnauthorizedException when Bearer token is empty", async () => {
      const context = createMockExecutionContext("Bearer");
      const validateTokenSpy = jest.spyOn(authService, "validateToken");

      await expect(guard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException("Missing token"),
      );
      expect(validateTokenSpy).not.toHaveBeenCalled();
    });

    it("should throw UnauthorizedException when token validation fails", async () => {
      const token = "invalid-token";
      const context = createMockExecutionContext(`Bearer ${token}`);
      const validationError = new Error("Invalid token format");
      const validateTokenSpy = jest
        .spyOn(authService, "validateToken")
        .mockRejectedValue(validationError);

      await expect(guard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException("Invalid token format"),
      );
      expect(validateTokenSpy).toHaveBeenCalledWith(token);
    });

    it("should throw UnauthorizedException when token is expired", async () => {
      const token = "expired-token";
      const context = createMockExecutionContext(`Bearer ${token}`);
      const expiredError = new UnauthorizedException("Token has expired");
      const validateTokenSpy = jest
        .spyOn(authService, "validateToken")
        .mockRejectedValue(expiredError);

      await expect(guard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException("Token has expired"),
      );
      expect(validateTokenSpy).toHaveBeenCalledWith(token);
    });

    it("should handle malformed authorization header gracefully", async () => {
      const context = createMockExecutionContext("NotBearer token");
      const validateTokenSpy = jest.spyOn(authService, "validateToken");

      await expect(guard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException("Missing token"),
      );
      expect(validateTokenSpy).not.toHaveBeenCalled();
    });
  });

  describe("extractTokenFromHeader", () => {
    it("should extract token from valid Bearer authorization header", async () => {
      const token = "test-token";
      const context = createMockExecutionContext(`Bearer ${token}`);
      const validateTokenSpy = jest
        .spyOn(authService, "validateToken")
        .mockResolvedValue(mockUserMetadata);

      await guard.canActivate(context);

      expect(validateTokenSpy).toHaveBeenCalledWith(token);
    });

    it("should handle missing authorization header", async () => {
      const context = createMockExecutionContext();
      const validateTokenSpy = jest.spyOn(authService, "validateToken");

      await expect(guard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(validateTokenSpy).not.toHaveBeenCalled();
    });

    it("should handle non-Bearer authorization type", async () => {
      const context = createMockExecutionContext("Basic dGVzdA==");
      const validateTokenSpy = jest.spyOn(authService, "validateToken");

      await expect(guard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(validateTokenSpy).not.toHaveBeenCalled();
    });
  });
});
