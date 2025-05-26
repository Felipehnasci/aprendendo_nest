import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  
  constructor(private readonly tasksService : TasksService){}
  
  @Get()
  findAllTasks(){
    return this.tasksService.listAllTasks()
  }

  @Get(":id")
  findOneTask(@Param('id') id: String){
    return this.tasksService.findOneTask(id)
  }

  @Post()
  createTask(@Body() body : any){
    return this.tasksService.createOneTask(body)
  }

  @Patch(":id")
  updateTask(@Param("id") id: String, @Body() body: any){
    console.log("ID: " + id)
    console.log("Body: " + JSON.stringify(body))

    return "Atualizando tarefa....."
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string){
    console.log("ID enviado com sucesso..." + id)

    return "Deletando tarefa..." + id
  }
}


