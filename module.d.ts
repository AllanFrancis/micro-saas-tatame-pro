declare namespace module {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
  }
}
