import {CanActivate, ExecutionContext, Injectable, Logger} from "@nestjs/common";
import {AuthService} from "./bank/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);

    constructor(private authService: AuthService) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> {
        let req = context.switchToHttp().getRequest();
        if (req.url === '/bank/sign-in' || req.url === '/bank/sign-up') {
            return true;
        }
        let token: string = req.headers.authorization.split(' ')[1]
        this.authService.checkToken(token)
        return true;
    }
}