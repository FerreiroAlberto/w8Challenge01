import { User } from '../../users/entities/user.entity';

export class Pet {
  id: string;
  name: string;
  species: string;
  age: number;
  user: Omit<User, 'pets'>;
}
