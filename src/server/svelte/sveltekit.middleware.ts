import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { SvelteKitHandler } from './sveltekit.handler';

@Injectable()
export class SvelteKitMiddleware implements NestMiddleware {
  constructor(private readonly svelteKitHandler: SvelteKitHandler) {}

  use(req: Request, res: Response, next: () => void) {
    if (!req.path.startsWith('/api')) {
      return this.svelteKitHandler.getHandler()(req, res, next);
    }
    next();
  }
}
