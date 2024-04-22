import { IsNumber, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;
  @IsString()
  species: string;
  @IsNumber()
  age: number;
  @IsString()
  userId: string;
}
