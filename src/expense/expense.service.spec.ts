import type { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;

  beforeEach(() => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as ExpenseService;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
