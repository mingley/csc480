import { PrismaClient } from '@prisma/client';

export async function dbTest(_req, res, _next): Promise<string> {
  const client = new PrismaClient();
  // const userData = await client.user.findMany();
  const project = await client.user.findMany({
    include: {
      project: {
        include: {
          columns: {
            include: {
              tasks: true
            }
          }
        }
      }
    }
  })
  // console.log("project data",project);
  res.send(project);
  return 'works';
}

