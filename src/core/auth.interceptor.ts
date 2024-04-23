import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PetsService } from 'src/pets/pets.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private pet: PetsService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const petId = request.params.id;
    if (!petId) {
      return next.handle();
    }
    return next.handle().pipe(
      tap(async () => {
        const pet = await this.pet.findOne(petId);
        if (!pet) {
          throw new NotFoundException(`Pet ${petId} not found`);
        }
        if (pet.user.id !== user.id) {
          throw new ForbiddenException(
            'Access Denied: You are not the owner of this pet',
          );
        }
      }),
    );
  }
}
