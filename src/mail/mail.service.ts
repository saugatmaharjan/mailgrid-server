import { Injectable, Logger } from '@nestjs/common';
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});
const sgMail = require('@sendgrid/mail');

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
  send(data: IMail) {
    const emailData = {
      ...data,
      from: process.env.SENDER_MAIL_ID,
    };
    return mailgun.messages().send(emailData, function(error, body) {
      Logger.log(error);
      console.log(error, body);
    });
  }
}
