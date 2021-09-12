// import { user_data, project_data } from './data';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   for (let project of project_data) {
//     await prisma.project.create({
//       data: project,
//     });
//   };
//   for (let user of user_data) {
//     await prisma.user.create({
//       data: user,
//     });
//   };
// }

// main()
//   .catch((e) => {
//     console.log(e);
//     // process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });
