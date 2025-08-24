import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { DatabaseService } from "./database.service";

@Controller("database")
@ApiTags("database")
export class DatabaseController {
  constructor(private readonly prisma: DatabaseService) {}
}
