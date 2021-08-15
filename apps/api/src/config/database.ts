import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "_username_",
  password: process.env.POSTGRES_PASSWORD || "_password_",
  database: process.env.POSTGRES_DB || "kiwi",
  entities: [],
  synchronize: true,
};

export default config;
