import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PetsController],
  providers: [PetsService],
  imports: [PrismaModule, UsersModule],
})
export class PetsModule {}
