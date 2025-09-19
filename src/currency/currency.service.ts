import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@Injectable()
export class CurrencyService {
  constructor(private database: DatabaseService) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    return this.database.currency.create({ data: createCurrencyDto });
  }

  async findAll() {
    return this.database.currency.findMany();
  }

  async findOne(id: number) {
    return this.database.currency.findUnique({ where: { id } });
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return this.database.currency.update({
      where: { id },
      data: updateCurrencyDto,
    });
  }

  async remove(id: number) {
    return this.database.currency.delete({ where: { id } });
  }
  async find_most_recent_rate(name: string): Promise<number | null> {
    if (!name || typeof name !== "string") {
      return null;
    }

    try {
      const result = await this.database.currency.findFirst({
        where: { name: name.toUpperCase() },
        orderBy: { timestamp: "desc" },
        select: { value: true },
      });

      return result?.value ?? null;
    } catch (error) {
      console.error(`Błąd podczas pobierania kursu dla ${name}:`, error);
      return null;
    }
  }
}
