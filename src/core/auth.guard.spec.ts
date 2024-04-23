import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authGuard = moduleRef.get<AuthGuard>(AuthGuard);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('canActivate', () => {
    it('should throw BadRequestException if no authorization header is present', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {},
          }),
        }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(context)).rejects.toThrow(
        'Email and password required',
      );
    });

    it('should return true if token is valid', async () => {
      const validToken = 'Bearer validtoken123';
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: validToken,
            },
          }),
        }),
      } as unknown as ExecutionContext;

      (jwtService.verifyAsync as jest.Mock).mockResolvedValue({
        id: '123',
        role: 'user',
      });

      await expect(authGuard.canActivate(context)).resolves.toBe(true);
    });

    it('should throw ForbiddenException if token is invalid', async () => {
      const invalidToken = 'Bearer invalidtoken123';
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: invalidToken,
            },
          }),
        }),
      } as unknown as ExecutionContext;

      (jwtService.verifyAsync as jest.Mock).mockRejectedValue(
        new Error('Invalid token'),
      );

      await expect(authGuard.canActivate(context)).rejects.toThrow(
        'Invalid token',
      );
    });
  });
});
