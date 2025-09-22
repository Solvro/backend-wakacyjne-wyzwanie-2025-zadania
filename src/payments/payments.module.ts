import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { RoleGuard } from "src/auth/roles/role.guard";
import { DatabaseModule } from "src/database/database.module";
import { UserModule } from "src/user/user.module";

import { Module } from "@nestjs/common";

import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, AuthService, RoleGuard],
  imports: [DatabaseModule, AuthModule, UserModule],
})
export class PaymentsModule {}
