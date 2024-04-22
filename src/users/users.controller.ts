import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  loggedUsers = this.usersService.loggedUsers;
  getLogged() {
    return this.loggedUsers;
  }

  isUserLogged(email: string): boolean {
    return this.loggedUsers.some((user) => user.email === email);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() data: CreateUserDto) {
    const email = data.email;
    const pass = data.password;
    console.log(data);
    const password = await this.usersService.searchByEmail(email);
    if (pass !== password) {
      throw new Error('Wrong credentials');
    }
    if (this.isUserLogged(email)) {
      return { message: 'User already logged in', user: { email } };
    }
    const loggedUser = { email: email, password: pass };
    this.usersService.loggedUsers = [...this.loggedUsers, loggedUser];
    return { message: 'Login successful', user: loggedUser };
  }

  @Post('logout')
  logout(@Body() data: CreateUserDto) {
    const email = data.email;
    this.usersService.loggedUsers = this.loggedUsers.filter(
      (user) => user.email !== email,
    );
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
