import { PartialType } from "@nestjs/swagger";

import { LoginDto } from "./login.dto";

export class UpdateAuthDto extends PartialType(LoginDto) {}
