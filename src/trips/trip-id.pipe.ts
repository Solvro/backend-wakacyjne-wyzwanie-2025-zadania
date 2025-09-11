import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class TripIdPipe implements PipeTransform {
  transform(value: unknown, _metadata: ArgumentMetadata): number {
    if (typeof value !== "string" && typeof value !== "number") {
      throw new BadRequestException("Nieprawidłowy nr wycieczki");
    }
    const n = Number(value);
    if (!Number.isInteger(n) || n <= 0) {
      throw new BadRequestException("Nieprawidłowy nr wycieczki");
    }
    return n;
  }
}
