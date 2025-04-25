import { emailClient } from "../clients/email";

export type SendAuthLinkEmailArgs = {
  email: string;
  token: string;
};

export async function sendAuthLinkEmail({
  email,
  token,
}: SendAuthLinkEmailArgs) {
  const link = new URL(`${process.env.APP_URL!}/auth/verify`);

  link.searchParams.append("token", token);

  const html = `<a href=${link}>Your magic link</a>`;

  await emailClient.sendMail({
    from: '"Ordo Support" <support@ordo.com>',
    to: email,
    subject: "Ordo Account Setup",
    text: "Here's Your Magic link",
    html,
  });
}
