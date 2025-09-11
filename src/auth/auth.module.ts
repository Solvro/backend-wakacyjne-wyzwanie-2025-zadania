import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { PrismaService } from "../../prisma/prisma.service";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.getOrThrow<string>("JWT_SECRET"),
        signOptions: {
          issuer: cfg.get<string>("JWT_ISSUER"),
          audience: cfg.get<string>("JWT_AUDIENCE"),
          expiresIn: cfg.get<string>("JWT_EXPIRES") ?? "1h",
        },
      }),
    }),
  ],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
