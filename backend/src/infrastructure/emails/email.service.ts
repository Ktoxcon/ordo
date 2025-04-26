import { injectable } from "inversify";
import { createTransport, type Transporter } from "nodemailer";
import type { Options, SentMessageInfo } from "nodemailer/lib/smtp-transport";
import type { SendAuthLinkEmailArgs } from "./email.service.types";

@injectable()
export class EmailService {
  private client: Transporter<SentMessageInfo, Options>;

  constructor() {
    this.client = createTransport({
      host: "smtp.Gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_APP_ADDRESS,
        pass: process.env.EMAIL_APP_TOKEN,
      },
    });
  }

  async sendAuthLinkEmail({ email, token }: SendAuthLinkEmailArgs) {
    const link = new URL(`${process.env.APP_URL!}/auth/verify`);

    link.searchParams.append("token", token);

    const html = `<a href=${link}>Your magic link</a>`;

    await this.client.sendMail({
      html,
      to: email,
      subject: "Ordo Account Setup",
      text: "Here's Your Magic link",
      from: '"Ordo Support" <support@ordo.com>',
    });
  }
}
