import { PartialType } from "@nestjs/swagger";

import { RegisterDto } from "./register.dto";

export class UpdateRegisterDto extends PartialType(RegisterDto) {}
