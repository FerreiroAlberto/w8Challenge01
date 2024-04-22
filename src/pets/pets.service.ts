import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreatePetDto) {
    return this.prisma.pet.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.pet.findMany();
  }

  async findOne(id: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException(`Pet ${id} not found`);
    }

    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    const data = updatePetDto;
    try {
      return await this.prisma.pet.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Pet ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.pet.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Pet ${id} not found`);
    }
  }
}
