import * as dotenv from 'dotenv';

dotenv.config();


export const AppConfiguration: {
  ACCESS_TOKEN_SECRET: string,
  REFRESH_TOKEN_SECRET: string,
  PORT: string,
  SALT_ROUNDS: number
} = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? 'set_me',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? 'plz',
  PORT: process.env.PORT ?? '',
  SALT_ROUNDS: 10
}
