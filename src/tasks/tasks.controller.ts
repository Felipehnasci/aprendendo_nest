import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInteceptor } from 'src/common/interceptors/add-header.interceptor';
import { AuthAdminGuard } from 'src/common/guards/admin-guard';

@Controller('tasks')
@UseGuards(AuthAdminGuard)
export class TasksController {
  
  constructor(private readonly tasksService : TasksService){}
  
  @Get()
  @UseInterceptors(AddHeaderInteceptor)
  @UseInterceptors(LoggerInterceptor)
  findAllTasks(@Query() paginationDto: PaginationDto){
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


