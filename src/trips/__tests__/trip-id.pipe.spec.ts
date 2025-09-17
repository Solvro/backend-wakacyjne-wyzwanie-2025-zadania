import { BadRequestException } from "@nestjs/common";

import { TripIdPipe } from "../trip-id.pipe";

describe("TripIdPipe", () => {
  const pipe = new TripIdPipe();

  it("parsuje poprawne id", () => {
    expect(pipe.transform("12", {} as any)).toBe(12);
  });

  it("odrzuca nieprawidłowe typt liczbowe", () => {
    expect(() => pipe.transform("0", {} as any)).toThrow(BadRequestException);
    expect(() => pipe.transform("-1", {} as any)).toThrow(BadRequestException);
    expect(() => pipe.transform("1.5", {} as any)).toThrow(BadRequestException);
  });

  it("odrzuca typy nieliczbowe", () => {
    expect(() => pipe.transform({} as any, {} as any)).toThrow(
      BadRequestException,
    );
  });
});
