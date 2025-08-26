import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { DatabaseService } from "./database.service";

@Controller("database")
@ApiTags("databases")
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}
}
