import nodemailer from "nodemailer";

export const emailClient = nodemailer.createTransport({
  host: "smtp.Gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_APP_ADDRESS,
    pass: process.env.EMAIL_APP_TOKEN,
  },
});
