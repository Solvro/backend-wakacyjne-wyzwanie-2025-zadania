import { AccountType, Currency, Role } from "@prisma/client";
import { hash } from "bcrypt";

export function validExpense() {
  return {
    name: "testExpense",
    value: 13.25,
    date: new Date(),
    trip_participant_id: 1,
    currency: Currency.CZK,
  };
}

export async function validParticipant() {
  return {
    name: "Jan",
    surname: "Kowalski",
    role: Role.USER,
    account_type: AccountType.BASIC,
    email: "JanKowalski@example.com",
    password: await hash("test", 10),
  };
}

export function validTrip() {
  return {
    name: "testTrip",
    description: "testDescription",
    begin_date: new Date("2025-08-15"),
    end_date: new Date("2025-08-16"),
  };
}
export function generateTestToken(id: number): string {
  return `token_${Date.now().toString()}:${String(id)}`;
}
