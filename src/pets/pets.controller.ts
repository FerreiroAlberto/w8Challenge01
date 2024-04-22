import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { UsersService } from 'src/users/users.service';

@Controller('pets')
export class PetsController {
  constructor(
    private readonly petsService: PetsService,
    private readonly users: UsersService,
  ) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePetDto) {
    const userEmail = data.email;
    if (!userEmail || !this.users.isUserLogged(userEmail)) {
      throw new ForbiddenException('Access Denied');
    }
    const pet = this.petsService.findOne(id);
    if ((await pet).userId !== userEmail) {
      throw new ForbiddenException('You can only update your pets');
    }
    delete data.email;
    return this.petsService.update(id, data);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Body() { userEmail }: { userEmail: string },
  ) {
    if (!this.users.isUserLogged(userEmail)) {
      throw new ForbiddenException('Access Denied');
    }
    const pet = this.petsService.findOne(id);
    if ((await pet).userId !== userEmail) {
      throw new ForbiddenException('You can only remove your pets');
    }
    return this.petsService.remove(id);
  }
}
