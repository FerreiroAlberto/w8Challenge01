import { PetsService } from 'src/pets/pets.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptorInterceptor', () => {
  let mockPetsService: jest.Mocked<PetsService>;
  it('should be defined', () => {
    expect(new AuthInterceptor(mockPetsService)).toBeDefined();
  });
});
