import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {Request} from 'express';
import { RequestWithUser } from '../Dto/request-with-user.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: RequestWithUser = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (token === undefined) {
            throw new UnauthorizedException("Missing token");
        }
        try {
            request.user = await this.authService.validateToken(token);
        } catch (error) {
            throw new UnauthorizedException((error as Error).message);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}