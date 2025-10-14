import { Injectable, NestMiddleware } from "@nestjs/common";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DevelopmentMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService) {}

    use (req: Request, res: Response, next: NextFunction) {
        const isDevelopment = this.configService.get<string>('NODE_ENV') === 'development'

        if (!req.path.startsWith('/api') && isDevelopment) {
            const proxy = createProxyMiddleware({
                target: 'http://localhost:5173',
                changeOrigin: true,
                selfHandleResponse: false,
                ws: true,
            })
            return proxy(req, res, next)
        }

        next();
    }
}
