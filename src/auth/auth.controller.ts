import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { UserSignupDto } from "./dto/auth.dto";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() userSignupDto: UserSignupDto) {
    return this.authService.signup(userSignupDto);
  }
}
