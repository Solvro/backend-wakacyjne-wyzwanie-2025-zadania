import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/roles/role.guard";
import type { CreateTripDto } from "./dto/create-trip.dto";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;
  let service: TripService;

  const mockTripService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripService,
          useValue: mockTripService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<TripController>(TripController);
    service = module.get<TripService>(TripService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("powinien utworzyć nową wycieczkę", async () => {
      const dto: CreateTripDto = {
        destination: "Bałtyk",
        type: "leisure",
        start_date: new Date("2000-01-01"),
        end_date: new Date("2000-01-07"),
      };

      // eslint-disable-next-line @typescript-eslint/no-misused-spread
      const expectedResult = { id: 1, ...dto };

      mockTripService.create.mockReturnValue(expectedResult);

      const result = await controller.create(dto);

      expect(result).toEqual(expectedResult);
      expect(mockTripService.create).toHaveBeenCalledTimes(1);
      expect(mockTripService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("findAll", () => {
    it("powinien zwrócić wszystkie wycieczki", async () => {
      const trips = [
        {
          id: 1,
          destination: "Bałtyk",
          type: "leisure",
          start_date: new Date(),
          end_date: new Date(),
        },
        {
          id: 2,
          destination: "Tatry",
          type: "adventure",
          start_date: new Date(),
          end_date: new Date(),
        },
      ];

      mockTripService.findAll.mockReturnValue(trips);

      const result = await controller.findAll();

      expect(result).toEqual(trips);
      expect(mockTripService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("powinien zwrócić wycieczkę po ID", async () => {
      const trip = {
        id: 1,
        destination: "Bałtyk",
        type: "leisure",
        start_date: new Date(),
        end_date: new Date(),
      };

      mockTripService.findOne.mockReturnValue(trip);

      const result = await controller.findOne("1"); // kontroler przyjmuje string z paramów

      expect(result).toEqual(trip);
      expect(mockTripService.findOne).toHaveBeenCalledTimes(1);
      expect(mockTripService.findOne).toHaveBeenCalledWith(1); // upewniamy się, że ID konwertowane na number
    });
  });

  describe("update", () => {
    it("powinien zaktualizować istniejącą wycieczkę", async () => {
      const id = 1;
      const dto = { destination: "Mazury" };
      const updatedTrip = { id, ...dto };

      mockTripService.update.mockReturnValue(updatedTrip);

      const result = await controller.update("1", dto);

      expect(result).toEqual(updatedTrip);
      expect(mockTripService.update).toHaveBeenCalledTimes(1);
      expect(mockTripService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe("remove", () => {
    it("powinien usunąć wycieczkę po ID", async () => {
      const deletedTrip = {
        id: 1,
        destination: "Bałtyk",
        type: "leisure",
        start_date: new Date(),
        end_date: new Date(),
      };

      mockTripService.remove.mockReturnValue(deletedTrip);

      const result = await controller.remove("1");

      expect(result).toEqual(deletedTrip);
      expect(mockTripService.remove).toHaveBeenCalledTimes(1);
      expect(mockTripService.remove).toHaveBeenCalledWith(1);
    });
  });
});
