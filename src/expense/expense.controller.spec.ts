import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;

  const mockExpenseService = {
    create: jest.fn((dto: Record<string, unknown>) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),

    update: jest.fn((id: number, dto: Record<string, unknown>) => {
      return {
        id,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [ExpenseService],
    })
      .overrideProvider(ExpenseService)
      .useValue(mockExpenseService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create an expense", async () => {
    const dto = {
      amount: 123.45,
      tripParticipantId: 1,
    };

    await expect(controller.create(dto)).resolves.toEqual(
      expect.objectContaining({
        amount: 123.45,
        tripParticipantId: 1,
      }),
    );

    expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
  });
});
