import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInteceptor } from 'src/common/interceptors/add-header.interceptor';
import { AuthAdminGuard } from 'src/common/guards/admin-guard';
import { TasksUtils } from './tasks.utils';
import { AuthTokenGuard } from 'src/auth/guard/auth.token.guard';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';

@Controller('tasks')
export class TasksController {
  
  constructor(
    private readonly tasksService : TasksService,
    private readonly tasksUtils: TasksUtils,

    @Inject("KEY_TOKEN")
    private readonly keyToken: string 
  ){}
  
  @Get()
  findAllTasks(@Query() paginationDto: PaginationDto){

    console.log("Key Token:", this.keyToken);
    console.log(this.tasksUtils.splitString("Hello World from NestJS"))
    return this.tasksService.findAllTasks(paginationDto)
  }

  @Get(":id")
  findOneTask(@Param('id', ParseIntPipe) id: number){
    return this.tasksService.findOneTask(id)
  }

  @Post()
  @UseGuards(AuthTokenGuard)
  createTask(@Body() createTaskDto: CreateTaskDTO,
    @TokenPayloadParam() payloadToken : PayloadTokenDto
    ){
    return this.tasksService.createOneTask(createTaskDto)
  }

  @Patch(":id")
  @UseGuards(AuthTokenGuard)
  updateTask(@Param("id", ParseIntPipe) id: number,@Body() updateTaskDto: UpdateTaskDTO){
  
    return this.tasksService.update(id, updateTaskDto)
  }

  @Delete(":id")
  @UseGuards(AuthTokenGuard)
  deleteTask(@Param("id", ParseIntPipe) id: number){
    return this.tasksService.delete(id)
  }

  @Delete()
  deleteAllTasks(){
    return this.tasksService.deleteAllTasks()
  }
}


