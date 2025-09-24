import type { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth.service";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  let guard: AuthGuard;

  const mockAuthService = {
    validateToken: jest.fn(),
  };

  beforeEach(async () => {
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });

  describe("canActivate", () => {
    const mockRequest = {
      headers: {},
      user: undefined,
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;

    it("should throw UnauthorizedException when no authorization header", async () => {
      mockRequest.headers = {};

      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        "Access token is required",
      );
    });

    it("should throw UnauthorizedException when authorization header is empty", async () => {
      mockRequest.headers = { authorization: "" };

      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it("should throw UnauthorizedException when authorization header format is invalid", async () => {
      mockRequest.headers = { authorization: "InvalidFormat token123" };

      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it("should return true when valid token is provided", async () => {
      const mockUser = { id: 1, name: "Test User", email: "test@test.com" };
      mockRequest.headers = { authorization: "Bearer valid-token" };
      mockAuthService.validateToken.mockResolvedValue(mockUser);

      const result = await guard.canActivate(mockContext);

      expect(result).toBe(true);
      expect(mockRequest.user).toEqual(mockUser);
      expect(mockAuthService.validateToken).toHaveBeenCalledWith("valid-token");
    });

    it("should throw UnauthorizedException when token validation fails", async () => {
      mockRequest.headers = { authorization: "Bearer invalid-token" };
      mockAuthService.validateToken.mockRejectedValue(
        new Error("Token validation failed"),
      );

      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        "Invalid token",
      );
    });

    it("should re-throw UnauthorizedException from auth service", async () => {
      mockRequest.headers = { authorization: "Bearer expired-token" };
      const unauthorizedError = new UnauthorizedException("Token expired");
      mockAuthService.validateToken.mockRejectedValue(unauthorizedError);

      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        unauthorizedError,
      );
    });
  });
});
