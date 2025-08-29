import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { PrismaService } from "./prisma.service";

@ApiTags("prisma")
@Controller("prisma")
export class PrismaController {
  constructor(private prismaService: PrismaService) {}
}
