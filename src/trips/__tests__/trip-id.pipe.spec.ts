import type { ArgumentMetadata } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";

import { TripIdPipe } from "../trip-id.pipe";

describe("TripIdPipe", () => {
  const pipe = new TripIdPipe();
  const metadata = {} as ArgumentMetadata;

  it("parsuje poprawne id", () => {
    expect(pipe.transform("12", metadata)).toBe(12);
  });

  it("odrzuca nieprawidłowe typy liczbowe", () => {
    expect(() => pipe.transform("0", metadata)).toThrow(BadRequestException);
    expect(() => pipe.transform("-1", metadata)).toThrow(BadRequestException);
    expect(() => pipe.transform("1.5", metadata)).toThrow(BadRequestException);
  });

  it("odrzuca typy nieliczbowe", () => {
    expect(() => pipe.transform({} as object, metadata)).toThrow(
      BadRequestException,
    );
  });
});
