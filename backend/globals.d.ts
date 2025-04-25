declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_SECRET: string;
    COOKIES_SECRET: string;
  }
}
