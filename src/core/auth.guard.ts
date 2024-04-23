import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;
    const secret = process.env.SECRET_JWT;

    if (!auth) {
      throw new BadRequestException('Email and password required');
    }
    const token = auth.split(' ')[1];
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret,
      });
      request.payload = payload;
      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
