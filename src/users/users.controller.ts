import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth.token.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe)  id: number) {

    console.log('Token teste: ', process.env.TOKEN_KEY);
    return this.UsersService.findOneUser(id);
  }

  @Get()
  findAllUsers(){
    return this.UsersService.findAllUsers()
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.UsersService.createUser(createUserDto);
  }
  
  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id', ParseIntPipe) id: number) {
    return this.UsersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id : number) {
    return this.UsersService.deleteUser(id);
  }

  @Delete()
  deleteAllUsers(){
    return this.UsersService.deleteAllUsers()
  }
}
