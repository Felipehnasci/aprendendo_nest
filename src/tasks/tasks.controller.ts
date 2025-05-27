import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  
  constructor(private readonly tasksService : TasksService){}
  
  @Get()
  findAllTasks(){
    return this.tasksService.findAllTasks()
  }

  @Get(":id")
  findOneTask(@Param('id') id: string){
    return this.tasksService.findOneTask(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO){
    return this.tasksService.createOneTask(createTaskDto)
  }

  @Patch(":id")
  updateTask(@Param("id") id: string,@Body() updateTaskDto: UpdateTaskDTO){
    console.log('ID recebido no controller:', id);
    console.log('DTO recebido no controller:', updateTaskDto);
    return this.tasksService.update(id, updateTaskDto)
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string){
    return this.tasksService.delete(id)
  }
}


