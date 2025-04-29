export default {
  secrets: ["DB_ID", "APP_DOMAIN", "SESSION_SECRET", "COOKIES_SECRET"],
  cookiesSecret: process.env.COOKIES_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
};
