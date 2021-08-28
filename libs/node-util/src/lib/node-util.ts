import { PrismaClient } from '@prisma/client';

export async function dbTest(req, res, next): Promise<string> {
  const client = new PrismaClient();
  // const userData = await client.user.findMany();
  const project = await client.project.findMany({
    include: {
      data: {
        include: {
          project: true,
          tasks: true,
          columns: true
        }
      }
    }
  })
  // console.log("project data",project);
  res.send(project);
  return 'works';
}

