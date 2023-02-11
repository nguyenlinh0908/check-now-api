import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RewriteApiEndpointMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // req.url = req.url.replace(/^\/api/, ''); // <--- not the .originalUrl
    req.url = req.url.replace('', '/api');
    next();
  }
}
