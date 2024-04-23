import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

const select = {
  id: true,
  email: true,
  role: true,
  pets: { select: { name: true, species: true, age: true } },
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
      select,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({ select });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async findForLogin(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid input');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select,
      });
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
        select,
      });
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
