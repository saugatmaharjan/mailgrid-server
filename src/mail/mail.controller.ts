import { Controller, Post, Body, Query, HttpCode } from '@nestjs/common';

import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post()
  @HttpCode(200)
  async sendEmail(@Body() data: IMail) {
    return await this.mailService.send(data);
  }
}
