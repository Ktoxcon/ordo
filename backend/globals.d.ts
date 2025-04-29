declare namespace NodeJS {
  interface ProcessEnv {
    DB_ID: string;
    APP_DOMAIN: string;
    SESSION_SECRET: string;
    COOKIES_SECRET: string;
  }
}
