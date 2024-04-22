import { Pet } from 'src/pets/entities/pet.entity';

export type Role = 'admin' | 'user' | 'guest';

export class User {
  id: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  pets: Pet[];
}
