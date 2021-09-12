import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// gets all users
router.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get('/get_all_projects', async (req: Request, res: Response) => {
  // const projects = await prisma.project.findUnique({
  //   where: {
  //     id: req.query.id,
  //   },
  // });
  
  // res.json(projects);
});

export const userRouter = router;
