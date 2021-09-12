import { Router, Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
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

    const { email, password, firstName, lastName } = req.body;

    const role = "ADMIN";

    const hashedPassword = await bcrypt.hash(
      password,
      AppConfiguration.SALT_ROUNDS
    );

    try {
      const newUser = await prisma.user.create({
        data: {
          password: hashedPassword,
          first_name: firstName,
          last_name: lastName,
          role,
          email,
        },
      });

      if(!newUser) {
        throw new Error('User not created');
      }

      return res.status(200).json({
        ...newUser,
        password: "u wish lol",
      });
    } catch (e) {
      return res.status(400).json({
        error: `${e.message}`,
      });
    }
  }
);

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

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

    if (!matchingUser) throw new Error('User does not exist.');
    const valid = await bcrypt.compare(password, matchingUser.password);
    if (!valid) throw new Error('Incorrect password.');
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

    console.log('user found and token refreshed');

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
  return res.send({ message: 'Logged Out' });
});

// send new access based upon refresh
router.post('/refresh_token', async (req: Request, res: Response) => {
  const token: string = req.cookies.refreshtoken;

  if (!token) return res.send({ accesstoken: '' });

  // let payload;
  // try {
  //   payload = verifyRefreshToken(token);
  // } catch (err) {
  //   return res.send({ accesstoken: '' });
  // }
  // valid token, check user exists
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

  console.log("updating token");
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
