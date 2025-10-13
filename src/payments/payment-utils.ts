import type { ForexRate } from "@prisma/client";

import { BadRequestException } from "@nestjs/common";

import type { PrismaService } from "../prisma/prisma.service";

// Define our own payment interface based on the schema
export interface PaymentEntity {
  id: number;
  title: string;
  description: string | null;
  originalAmount: number;
  originalCurrency: string;
  plnAmount: number;
  forexRateId: number;
  status: string;
  processedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  tripId: number | null;
  expenseId: number | null;
  exchangeRate?: ForexRate;
}

export interface CreatePaymentData {
  title: string;
  description?: string;
  originalAmount: number;
  originalCurrency: string;
  plnAmount: number;
  forexRateId: number;
  status: string;
  tripId: number | null;
  expenseId: number | null;
  createdAt?: Date;
  processedAt?: Date | null;
  payerId?: number;
  image?: string;
  category?: string;
}

export function isPaymentEntity(value: unknown): value is PaymentEntity {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    "originalAmount" in value &&
    "plnAmount" in value
  );
}

export function isPaymentArray(value: unknown): value is PaymentEntity[] {
  return Array.isArray(value) && value.every((item) => isPaymentEntity(item));
}

export class PaymentDatabaseUtils {
  constructor(private readonly prisma: PrismaService) {}

  async safeCreatePayment(data: CreatePaymentData): Promise<PaymentEntity> {
    try {
      // Use type assertion to work around Prisma type resolution issues
      const prismaClient = this.prisma as unknown as {
        payment: {
          create: (arguments_: { data: CreatePaymentData }) => Promise<unknown>;
        };
      };
      const result = await prismaClient.payment.create({ data });

      if (!isPaymentEntity(result)) {
        throw new Error("Invalid payment data returned from database");
      }

      return result;
    } catch (error) {
      throw new BadRequestException(
        `Failed to create payment: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async safeFindPayment(id: number): Promise<PaymentEntity | null> {
    try {
      const prismaClient = this.prisma as unknown as {
        payment: {
          findUnique: (arguments_: {
            where: { id: number };
          }) => Promise<unknown>;
        };
      };
      const result = await prismaClient.payment.findUnique({ where: { id } });

      if (result === null) {
        return null;
      }

      if (!isPaymentEntity(result)) {
        throw new Error("Invalid payment data returned from database");
      }

      return result;
    } catch (error) {
      throw new BadRequestException(
        `Failed to find payment: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async safeFindManyPayments(options: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, unknown>;
    take?: number;
    skip?: number;
  }): Promise<PaymentEntity[]> {
    try {
      const prismaClient = this.prisma as unknown as {
        payment: { findMany: (arguments_: typeof options) => Promise<unknown> };
      };
      const result = await prismaClient.payment.findMany(options);

      if (!isPaymentArray(result)) {
        throw new Error("Invalid payment data returned from database");
      }

      return result;
    } catch (error) {
      throw new BadRequestException(
        `Failed to find payments: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async safeFindManyPaymentsWithForexRate(options: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, unknown>;
    take?: number;
    skip?: number;
  }): Promise<PaymentEntity[]> {
    try {
      const prismaClient = this.prisma as unknown as {
        payment: {
          findMany: (
            arguments_: typeof options & { include: { exchangeRate: boolean } },
          ) => Promise<unknown>;
        };
      };
      const result = await prismaClient.payment.findMany({
        ...options,
        include: { exchangeRate: true },
      });

      if (!isPaymentArray(result)) {
        throw new Error("Invalid payment data returned from database");
      }

      return result;
    } catch (error) {
      throw new BadRequestException(
        `Failed to find payments with forex rates: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async safeUpdatePayment(
    id: number,
    data: Partial<CreatePaymentData>,
  ): Promise<PaymentEntity> {
    try {
      const prismaClient = this.prisma as unknown as {
        payment: {
          update: (arguments_: {
            where: { id: number };
            data: Partial<CreatePaymentData>;
          }) => Promise<unknown>;
        };
      };
      const result = await prismaClient.payment.update({ where: { id }, data });

      if (!isPaymentEntity(result)) {
        throw new Error("Invalid payment data returned from database");
      }

      return result;
    } catch (error) {
      throw new BadRequestException(
        `Failed to update payment: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async safeUpdatePaymentWithForexRate(
    id: number,
    data: Partial<CreatePaymentData>,
  ): Promise<PaymentEntity> {
    try {
      const prismaClient = this.prisma as unknown as {
        payment: {
          update: (arguments_: {
            where: { id: number };
            data: Partial<CreatePaymentData>;
            include: { exchangeRate: boolean };
          }) => Promise<unknown>;
        };
      };
      const result = await prismaClient.payment.update({
        where: { id },
        data,
        include: { exchangeRate: true },
      });

      if (!isPaymentEntity(result)) {
        throw new Error("Invalid payment data returned from database");
      }

      return result;
    } catch (error) {
      throw new BadRequestException(
        `Failed to update payment with forex rate: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async safeDeletePayment(id: number): Promise<void> {
    try {
      const prismaClient = this.prisma as unknown as {
        payment: {
          delete: (arguments_: { where: { id: number } }) => Promise<unknown>;
        };
      };
      await prismaClient.payment.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete payment: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async safeFindPaymentWithForexRate(
    id: number,
  ): Promise<PaymentEntity | null> {
    try {
      const prismaClient = this.prisma as unknown as {
        payment: {
          findUnique: (arguments_: {
            where: { id: number };
            include: { exchangeRate: boolean };
          }) => Promise<unknown>;
        };
      };
      const result = await prismaClient.payment.findUnique({
        where: { id },
        include: { exchangeRate: true },
      });

      if (result === null) {
        return null;
      }

      if (!isPaymentEntity(result)) {
        throw new Error("Invalid payment data returned from database");
      }

      return result;
    } catch (error) {
      throw new BadRequestException(
        `Failed to find payment with forex rate: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
