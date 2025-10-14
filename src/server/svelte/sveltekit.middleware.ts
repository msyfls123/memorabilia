import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { SvelteKitHandler } from './sveltekit.handler.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SvelteKitMiddleware implements NestMiddleware {
  constructor(
    private readonly svelteKitHandler: SvelteKitHandler,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: () => void) {
     const isDevelopment = this.configService.get<string>('NODE_END') === 'development'
     const isSvelteKitRequests = !(req.path.startsWith('/api') || req.baseUrl.startsWith('/_app'))

    if (!isDevelopment && isSvelteKitRequests) {
      req.url = req.baseUrl;
      return this.svelteKitHandler.getHandler()(req, res, next);
    }
    next();
  }
}
