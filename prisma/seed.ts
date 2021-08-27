import { user_data, task_data, project_data } from './data';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let user of user_data) {
    await prisma.user.create({
      data: user,
    });
  }
  for (let task of task_data) {
    await prisma.task.create({
      data: task,
    });
  }
  for (let project of project_data) {
    await prisma.project.create({
      data: project,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    // process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
