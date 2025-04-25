export default {
  secrets: [
    "APP_URL",
    "SESSION_SECRET",
    "COOKIES_SECRET",
    "EMAIL_APP_TOKEN",
    "EMAIL_APP_ADDRESS",
  ],
  cookiesSecret: process.env.COOKIES_SECRET!,
  sessionSecret: process.env.SESSION_SECRET!,
};
