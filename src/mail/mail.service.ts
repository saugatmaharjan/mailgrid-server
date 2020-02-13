import { Injectable, HttpException } from '@nestjs/common';
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});
const sgMail = require('@sendgrid/mail');

const promised = function(mailData: any): Promise<{ err: any; res: any }> {
  return new Promise((resolve, reject) => {
    mailgun.messages().send(mailData, function(err, res) {
      resolve({
        err,
        res,
      });
    });
  });
};
@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  sendThroughMailgun(data): Promise<{ err: any; res: any }> {
    return new Promise((resolve, reject) => {
      mailgun.messages().send(data, function(err, res) {
        resolve({ err: true, res });
      });
    });
  }

  async sendByProirity(data) {
    const { err, res } = await this.sendThroughMailgun(data);

    if (err) {
      const [response, error] = await sgMail.send(data);
      if (error) {
        throw new Error('Email send failed');
      }

      return response;
    }
    return res;
  }

  async send(data: IMail) {
    const emailData = {
      ...data,
      from: process.env.SENDER_MAIL_ID,
    };

    try {
      const response = await this.sendByProirity(emailData);

      return {
        success: true,
        response,
      };
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }
}
