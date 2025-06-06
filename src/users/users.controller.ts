import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth.token.guard';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';

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
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto
    ) {

    return this.UsersService.updateUser(id, updateUserDto, tokenPayload);
  }

  
  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  deleteUser(
    @Param('id', ParseIntPipe) id : number, 
    @TokenPayloadParam() tokenPayload: PayloadTokenDto
    ) {
    return this.UsersService.deleteUser(id, tokenPayload);
  }

  @Delete()
  deleteAllUsers(@TokenPayloadParam() tokenPayload: PayloadTokenDto) {
    return this.UsersService.deleteAllUsers(tokenPayload)
  }
}
