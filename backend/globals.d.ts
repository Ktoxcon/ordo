declare namespace NodeJS {
  interface ProcessEnv {
    DB_ID: string;
    SESSION_SECRET: string;
    COOKIES_SECRET: string;
  }
}
