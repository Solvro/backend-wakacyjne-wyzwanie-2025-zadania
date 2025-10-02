import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let controller: ParticipantController;

  const mockParticipantService = {
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
      controllers: [ParticipantController],
      providers: [ParticipantService],
    })
      .overrideProvider(ParticipantService)
      .useValue(mockParticipantService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a participant", async () => {
    const dto = {
      name: "Imie",
      surname: "Nazwisko",
      age: 19,
      email: "test@example.com",
    };

    await expect(controller.create(dto)).resolves.toEqual(
      expect.objectContaining({
        name: "Imie",
        surname: "Nazwisko",
        age: 19,
        email: "test@example.com",
      }),
    );

    expect(mockParticipantService.create).toHaveBeenCalledWith(dto);
  });
});
