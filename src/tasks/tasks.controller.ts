import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tasks')
export class TasksController {
  
  constructor(private readonly tasksService : TasksService){}
  
  @Get()
  findAllTasks(@Query() paginationDto: PaginationDto){
    return this.tasksService.findAllTasks(paginationDto)
  }

  @Get(":id")
  findOneTask(@Param('id', ParseIntPipe) id: number){
    return this.tasksService.findOneTask(id)
  }

  @Post()
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
}


