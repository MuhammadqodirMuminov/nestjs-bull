import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('quiz')
  async quiz() {
    return await this.appService.quizResult();
  }

  @Post('exam')
  async exam() {
    return await this.appService.examResult();
  }

  @Post('pool')
  async pool() {
    return await this.appService.poolResult();
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
