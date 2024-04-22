import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [UsersModule, PrismaModule, PetsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
