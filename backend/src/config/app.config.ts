export default {
  secrets: ["DB_ID", "SESSION_SECRET", "COOKIES_SECRET"],
  cookiesSecret: process.env.COOKIES_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
};
