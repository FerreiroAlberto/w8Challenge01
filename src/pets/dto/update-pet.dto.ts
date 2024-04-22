import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @IsString()
  email?: string;
  @IsNumber()
  age: number;
  @IsString()
  userId: string;
}
