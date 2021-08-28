import { PrismaClient } from '@prisma/client';

export async function dbTest(req, res, next): Promise<string> {
  const client = new PrismaClient();
  const data = await client.user.findFirst();
  console.log(data);
  res.send(data);
  return 'works';
}

