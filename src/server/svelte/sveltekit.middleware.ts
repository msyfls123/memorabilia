import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { SvelteKitHandler } from './sveltekit.handler.js';

@Injectable()
export class SvelteKitMiddleware implements NestMiddleware {
  constructor(private readonly svelteKitHandler: SvelteKitHandler) {}

  use(req: Request, res: Response, next: () => void) {
    if (!req.path.startsWith('/api') && !req.baseUrl.startsWith('/_app')) {
      req.url = req.baseUrl;
      return this.svelteKitHandler.getHandler()(req, res, next);
    }
    next();
  }
}
