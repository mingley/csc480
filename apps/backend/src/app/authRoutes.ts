import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} from './tokens';
import { AppConfiguration, prisma } from './config';

const router = Router();

router.post(
  '/register',
  async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;

    const role = 'ADMIN';

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

      if (!newUser) {
        throw new Error('User not created');
      }

      return res.status(200).json({
        ...newUser,
        password: 'u wish lol',
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
        refresh_token: true,
        projects: true,
        role: true,
      },
    });

    if (!matchingUser) throw new Error('User does not exist.');
    const valid = await bcrypt.compare(password, matchingUser.password);
    if (!valid) throw new Error('Incorrect password.');
    const accessToken = createAccessToken(matchingUser.id.toString());
    const refreshToken = createRefreshToken(matchingUser.id.toString());

    matchingUser.refresh_token = refreshToken;
    await prisma.user.update({
      where: {
        id: matchingUser.id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });
    sendRefreshToken(res, refreshToken);
    matchingUser.password = 'nope';
    sendAccessToken(req, res, accessToken, matchingUser);
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
    where: { refresh_token: token },
    select: {
      id: true,
      email: true,
      password: true,
      refresh_token: true,
    },
  });
  if (!user) return res.send({ accesstoken: '' });
  // validate refresh
  if (user.refresh_token !== token) return res.send({ accesstoken: '' });
  const accessToken = createAccessToken(user.id.toString());
  const refreshToken = createRefreshToken(user.id.toString());

  console.log('updating token');
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refresh_token: refreshToken,
    },
  });
  sendRefreshToken(res, refreshToken);
  sendAccessToken(req, res, accessToken);
});

export const authRouter = router;
