import { Module, forwardRef } from "@nestjs/common";

import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [forwardRef(() => UserModule)],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
