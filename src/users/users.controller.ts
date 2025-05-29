import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {


  @Get(':id')
  findOneUser(){
    return "ROTA FUNCIONANDO"
  }

  @Get()
  findAllUsers(){

  }
}
