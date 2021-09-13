import { Router, Request, Response } from 'express';
import { prisma } from './config';

const router = Router();

// gets all users
router.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get('/projectboards/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const projectboards = await prisma.user.findUnique({
      where: { id: userId },
      select: { project: true },
    });
    return res.status(200).json(projectboards);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

router.post(
  '/projectboards/create',
  async (req: Request, res: Response) => {
    try {
      const { name, userId } = req.body;

      const projectboard = await prisma.project.create({
        data: {
          name,
          creator: { connect: { id: userId } },
        }
      })
      res.status(200).json(projectboard);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
  }
);

export const userRouter = router;
