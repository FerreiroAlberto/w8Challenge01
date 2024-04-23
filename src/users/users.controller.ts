import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ForbiddenException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptoService } from 'src/core/crypto.service';
import { JwtService } from '@nestjs/jwt';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly crypto: CryptoService,
    private readonly jwt: JwtService,
  ) {}
  @Post('login')
  async login(@Body() data: CreateUserDto) {
    const secret = process.env.SECRET_JWT;
    const { email, password } = data;
    if (!email || !password) {
      throw new BadRequestException('Email and password required');
    }
    const user = await this.usersService.findForLogin(email);
    if (!(await this.crypto.compare(user.password, password))) {
      throw new ForbiddenException('Invalid input');
    }
    const token = await this.jwt.signAsync(
      { id: user.id, role: user.role },
      { secret: secret },
    );
    return { token };
  }

  // @Get('login')
  // async tokenLogin(@Headers('Authorization') auth: string) {
  //   const secret = process.env.SECRET_JWT;
  //   const token = auth.split('')[1];
  //   if (!auth) {
  //     throw new BadRequestException('Email and password required');
  //   }
  //   try {
  //     const payload = await this.jwt.verifyAsync(token, {
  //       secret,
  //     });
  //     return payload;
  //   } catch {}
  // }

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    data.password = await this.crypto.hash(data.password);
    return this.usersService.create(data);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    if (data.password) {
    }
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
