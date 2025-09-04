import type { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;

  beforeEach(() => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as ParticipantService;
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
