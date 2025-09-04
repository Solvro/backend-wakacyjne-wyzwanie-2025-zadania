import type { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;

  beforeEach(() => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as TripService;
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
