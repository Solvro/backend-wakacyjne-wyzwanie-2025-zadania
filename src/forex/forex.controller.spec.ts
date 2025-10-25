import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { ForexController } from "./forex.controller";
import { ForexService } from "./forex.service";

describe("ForexController", () => {
  let controller: ForexController;

  const mockForexService = {
    fetchCurrentRates: jest.fn(),
    getLatestRates: jest.fn(),
    getRatesHistory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForexController],
      providers: [
        {
          provide: ForexService,
          useValue: mockForexService,
        },
      ],
    }).compile();

    controller = module.get<ForexController>(ForexController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchCurrentRates", () => {
    it("should fetch current rates successfully", async () => {
      const mockResponse = {
        fetchedCount: 3,
        rates: [
          {
            currencyName: "USD",
            rate: 4.1234,
            fetchedAt: "2025-09-20T10:00:00.000Z",
          },
        ],
        fetchedAt: "2025-09-20T10:00:00.000Z",
      };

      mockForexService.fetchCurrentRates.mockResolvedValue(mockResponse);

      const result = await controller.fetchCurrentRates();

      expect(result).toEqual(mockResponse);
      expect(mockForexService.fetchCurrentRates).toHaveBeenCalledTimes(1);
    });
  });

  describe("getLatestRates", () => {
    it("should return latest rates", async () => {
      const mockRates = [
        {
          currencyName: "USD",
          rate: 4.1234,
          fetchedAt: "2025-09-20T10:00:00.000Z",
        },
        {
          currencyName: "EUR",
          rate: 4.5678,
          fetchedAt: "2025-09-20T10:00:00.000Z",
        },
      ];

      mockForexService.getLatestRates.mockResolvedValue(mockRates);

      const result = await controller.getLatestRates();

      expect(result).toEqual(mockRates);
      expect(mockForexService.getLatestRates).toHaveBeenCalledTimes(1);
    });
  });

  describe("getRatesHistory", () => {
    it("should return rates history with currency filter", async () => {
      const mockRates = [
        {
          currencyName: "USD",
          rate: 4.1234,
          fetchedAt: "2025-09-20T10:00:00.000Z",
        },
      ];

      mockForexService.getRatesHistory.mockResolvedValue(mockRates);

      const result = await controller.getRatesHistory("USD", 5);

      expect(result).toEqual(mockRates);
      expect(mockForexService.getRatesHistory).toHaveBeenCalledWith("USD", 5);
    });

    it("should throw BadRequestException for invalid limit", async () => {
      await expect(controller.getRatesHistory("USD", 0)).rejects.toThrow(
        BadRequestException,
      );

      await expect(controller.getRatesHistory("USD", 101)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe("getScheduleStatus", () => {
    it("should return schedule status with enabled flag and schedules", () => {
      const result = controller.getScheduleStatus();

      expect(result).toHaveProperty("enabled", true);
      expect(result).toHaveProperty("schedules");
      expect(Array.isArray(result.schedules)).toBe(true);
      expect(result.schedules).toHaveLength(3);

      // Check that all schedules have required properties
      for (const schedule of result.schedules) {
        expect(schedule).toHaveProperty("name");
        expect(schedule).toHaveProperty("expression");
        expect(schedule).toHaveProperty("description");
        expect(schedule).toHaveProperty("nextRun");
        expect(typeof schedule.name).toBe("string");
        expect(typeof schedule.expression).toBe("string");
        expect(typeof schedule.description).toBe("string");
        expect(typeof schedule.nextRun).toBe("string");
      }

      // Check specific schedule names
      const scheduleNames = result.schedules.map((s) => s.name);
      expect(scheduleNames).toContain("Daily Morning Fetch");
      expect(scheduleNames).toContain("Weekday Afternoon Fetch");
      expect(scheduleNames).toContain("Weekly Maintenance");
    });
  });
});
