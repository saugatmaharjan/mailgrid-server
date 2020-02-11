import { Controller, Post, Body } from '@nestjs/common';

import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post()
  sendEmail(@Body() data: IMail) {
    console.log('controller', data);
    return this.mailService.send(data);
  }
}
