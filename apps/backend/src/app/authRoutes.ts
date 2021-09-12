import { Router, Request, Response, NextFunction } from 'express';
import bcrypt, { compare } from 'bcrypt';
import {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  verifyRefreshToken,
} from './tokens';
import { AppConfiguration } from './config';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name, role } = req.body;

    console.log(email, password, name, role);

    const hashedPassword = await bcrypt.hash(
      password,
      AppConfiguration.SALT_ROUNDS
    );
    const newUser = await prisma.user.create({
      data: {
        password: hashedPassword,
        name,
        role,
        email,
      },
    });
    res.json({
      ...newUser,
      password: '<redacted>',
    });
  }
);

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log('login info recieved: ', email, password);

  try {
    const matchingUser = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
        refreshToken: true,
      },
    });

    if (!matchingUser) throw new Error('user does not exist');
    const valid = await compare(password, matchingUser.password);
    if (!valid) throw new Error('password incorrect');
    const accessToken = createAccessToken(matchingUser.id.toString());
    const refreshToken = createRefreshToken(matchingUser.id.toString());

    matchingUser.refreshToken = refreshToken;
    await prisma.user.update({
      where: {
        id: matchingUser.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken);
  } catch (err) {
    res.status(401).send({
      error: `${err.message}`,
    });
  }
});

router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });
  return res.send({ message: 'logged out' });
});

// send new access based upon refresh
router.post('/refresh_token', async (req: Request, res: Response) => {
  const token: string = req.cookies.refreshtoken;

  if (!token) return res.send({ accesstoken: '' });

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }
  // valid token, check user
  // const user = fakeDB.find(user => user.id===payload.userId);
  const user = await prisma.user.findUnique({
    where: { refreshToken: token },
    select: {
      id: true,
      email: true,
      password: true,
      refreshToken: true,
    },
  });
  if (!user) return res.send({ accesstoken: '' });
  // validate refresh
  if (user.refreshToken !== token) return res.send({ accesstoken: '' });
  const accessToken = createAccessToken(user.id.toString());
  const refreshToken = createRefreshToken(user.id.toString());

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshToken: refreshToken,
    },
  });
  sendRefreshToken(res, refreshToken);
  sendAccessToken(req, res, accessToken);
});

export const authRouter = router;
