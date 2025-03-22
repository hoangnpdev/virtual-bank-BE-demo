import {Injectable, Logger, Scope, UnauthorizedException} from "@nestjs/common";
import {jwtConstants} from "../jwt.constant";
import {JwtService} from "@nestjs/jwt";
import {AsyncLocalStorage} from "async_hooks";


@Injectable()
export class AuthService {
    private readonly log: Logger = new Logger(AuthService.name);
    constructor(
        private asyncLocalStorage: AsyncLocalStorage<any>,
        private jwtService: JwtService) {
    }

    setCurrentUser(user: string) {
        this.asyncLocalStorage.getStore()['accountName'] = user;
    }

    getCurrentUser(): string {
        return this.asyncLocalStorage.getStore()['accountName']
    }

    checkToken(token: string) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: jwtConstants.secret
            });
            this.setCurrentUser(payload.accountName);
        } catch {
            throw new UnauthorizedException('wrong auth token');
        }
    }

    async generateToken(payload: any) {
        return this.jwtService.signAsync(payload);
    }
}