import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PetsModule } from './pets/pets.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [UsersModule, PrismaModule, PetsModule, CoreModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
