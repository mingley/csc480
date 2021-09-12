import { verify, decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppConfiguration } from './config';

const getToken = (req: Request): string => {
  const authorization = req.headers['authorization'];
  if (!authorization) throw new Error('you need to log in');
  // expect 'Bearer {string}'
  // const token = authorization.split(' ')[1];
  return authorization.split(' ')[1];
};

export const jwtAuthMiddleware = () => {
  return async function middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = getToken(req);
      const decoded = verify(token, AppConfiguration.ACCESS_TOKEN_SECRET);
      res.locals.token = token;
      res.locals.decoded = decoded;
      next();
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        res.status(401).json({
          message: 'Token Expired',
          error: e.message,
          tokenExpired: true,
        });
        return;
      }
      if (e.name === 'JsonWebTokenError') {
        res.status(401).json({
          message: 'Error parsing token',
          error: e.message,
        });
      }
      if (e.name === 'NotBeforeError') {
        res.status(401).json({
          message: 'JWT not active',
          error: e.message,
          date: e.date,
        });
      }
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  };
};
