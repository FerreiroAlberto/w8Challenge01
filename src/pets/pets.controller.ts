import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/core/auth.guard';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@UseGuards(AuthGuard)
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
    return this.petsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
