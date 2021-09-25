import { Router, Request, Response } from 'express';
import { prisma } from './config';

const router = Router();

// get all projects and tasks for a user
router.get('/project/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const projectboardsAndTasks = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        projects: true,
        assigned_tasks: true,
      },
    });

    return res.status(200).json({ projectboardsAndTasks });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

// make a new project for a user
router.post('/project/create', async (req: Request, res: Response) => {
  try {
    const { name, userId } = req.body;

    const projectboard = await prisma.project.create({
      data: {
        name,
        users: { connect: { id: userId } },
        creatorId: userId,
      },
    });

    const defaultColumnNames = ['Todo', 'In Progress', 'Review', 'Done'];
    // gen default columns
    for (const columnName of defaultColumnNames) {
      await prisma.column.create({
        data: {
          title: columnName,
          project: { connect: { id: projectboard.id } },
        },
      });
    }

    res.status(200).json(projectboard);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

// delete project
router.delete('/project/:projectId', async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;

    console.log(projectId);

    await prisma.project.delete({
      where: { id: projectId },
    });

    res.status(200).json({ message: 'Project deleted' });

    return;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

// get all columns for a project
router.get(
  '/project/:projectId/columns',
  async (req: Request, res: Response) => {
    try {
      const projectId = req.params.projectId;

      const columns = await prisma.column.findMany({
        where: { project: { id: projectId } },
        include: { tasks: true },
      });

      res.status(200).json(columns);

      return;
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
  }
);

// create a new task
router.post('/project/task/create', async (req: Request, res: Response) => {
  try {
    const { title, content, columnId, userId } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        content,
        status: 'TODO',
        column: { connect: { id: columnId } },
        assigned_to: { connect: { id: userId } },
      },
    });

    res.status(200).json(task);

    return;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

// delete a task
router.delete('/project/task/:taskId', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;

    await prisma.task.delete({
      where: { id: taskId },
    });

    res.status(200).json({ message: 'Task deleted' });

    return;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

// get comments for a task
router.get('/project/task/:taskId', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;

    const comments = await prisma.task.findUnique({
      where: { id: taskId },
      select: { comments: true },
    });

    console.log(comments);

    res.status(200).json(comments);

    return;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

// updates task points
router.post('/project/task', async (req: Request, res: Response) => {
  try {
    const { id, points } = req.body;

    const task = await prisma.task.update({
      where: { id: id },
      data: { points: points },
    });

    res.status(200).json(task);

    return;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

// updates comments on a task
router.post('/project/task/comment', async (req: Request, res: Response) => {

  try {
    const { taskId, comment, userId } = req.body;

    const task = await prisma.taskComment.create({
      data: {
        content: comment,
        task: { connect: { id: taskId } },
        author: { connect: { id: userId } },
      },
    });

    res.status(200).json(task);
    console.log(task);
    return;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

export const userRouter = router;
