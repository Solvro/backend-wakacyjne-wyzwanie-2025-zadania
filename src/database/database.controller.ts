import { Controller } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Controller("database")
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}
}
