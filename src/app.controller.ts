import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import express from 'express';

@Controller('wakacyjne/backend')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(@Res() res: express.Response) {
    const data = this.appService.getHello();
    return res.status(418).json(data);
  }
}