import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {AsyncLocalStorage} from "async_hooks";

@Injectable()
export class AlsMiddleware implements NestMiddleware {
    constructor(private asyncLocalStorage: AsyncLocalStorage<any>) {
    }
    use(req: Request, res: Response, next: NextFunction) {
        const store: any = {};
        this.asyncLocalStorage.run(store, () => next());
    }
}