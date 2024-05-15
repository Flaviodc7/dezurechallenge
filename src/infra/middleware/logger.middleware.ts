import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.sendStatus(401);
      return;
    }

    try {
      const decodedToken = jwt.decode(token) as any;
      if (decodedToken.general_email) {
        req.body.userEmail = decodedToken.general_email;
        next();
      } else {
        res.sendStatus(403);
      }
    } catch {
      res.sendStatus(403);
    }
  }
}
