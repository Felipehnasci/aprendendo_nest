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

@Controller('tasks')
@UseGuards(AuthAdminGuard)
export class TasksController {
  
  constructor(
    private readonly tasksService : TasksService,
    private readonly tasksUtils: TasksUtils,

    @Inject("KEY_TOKEN")
    private readonly keyToken: string 
  ){}
  
  @Get()
  @UseInterceptors(AddHeaderInteceptor)
  @UseInterceptors(LoggerInterceptor)
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
  @UseInterceptors(BodyCreateTaskInterceptor)
  createTask(@Body() createTaskDto: CreateTaskDTO){
    return this.tasksService.createOneTask(createTaskDto)
  }

  @Patch(":id")
  updateTask(@Param("id", ParseIntPipe) id: number,@Body() updateTaskDto: UpdateTaskDTO){
  
    return this.tasksService.update(id, updateTaskDto)
  }

  @Delete(":id")
  deleteTask(@Param("id", ParseIntPipe) id: number){
    return this.tasksService.delete(id)
  }

  @Delete()
  deleteAllTasks(){
    return this.tasksService.deleteAllTasks()
  }
}


