import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RegisterDto } from "./dto/register.dto";
import { RegisterService } from "./register.service";

@ApiTags("register")
@Controller("register")
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Register new user",
    description: "Register new user",
  })
  @ApiResponse({
    status: 201,
    description: "Participant registered",
    type: RegisterDto,
  })
  async signIn(@Body() registerDto: RegisterDto) {
    return this.registerService.signUp(registerDto);
  }
}
