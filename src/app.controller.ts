import type { Response } from "express";

import { Controller, Get, HttpStatus, Res } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("wakacyjne/backend")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() response: Response) {
    return response
      .status(HttpStatus.I_AM_A_TEAPOT)
      .json(this.appService.getHello());
  }
}
