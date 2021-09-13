import { sign, verify } from 'jsonwebtoken';
import { AppConfiguration } from './config';
import { Request, Response } from 'express';

export const createAccessToken = (userId: string) =>
  sign({ userId }, AppConfiguration.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });

export const createRefreshToken = (userId: string) => {
  return sign({ userId }, AppConfiguration.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

export const sendAccessToken = (
  req: Request,
  res: Response,
  accessToken: string,
  user = null
) => {
  if (user !== null) {
    res.send({
      accessToken,
      email: req.body.email,
      user,
    });
  } else {
    res.send({
      accessToken,
      email: req.body.email,
    });
  }
};

export const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie('refreshtoken', refreshToken, {
    httpOnly: true,
    path: '/refresh_token',
  });
};

export const verifyRefreshToken = (token: string): string => {
  const product = verify(token, AppConfiguration.REFRESH_TOKEN_SECRET);
  if (typeof product === 'string') return product;
  return product.userId;
};

export const verifyAccessToken = (token: string): string => {
  const product = verify(token, AppConfiguration.ACCESS_TOKEN_SECRET);
  if (typeof product === 'string') return product;
  return product.userId;
};
