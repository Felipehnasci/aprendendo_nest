import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/tasks.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {

  

  constructor(private prisma: PrismaService){}

  async findAllTasks(paginationDto?: PaginationDto){
    const { limit = 10, offset = 0} = paginationDto || {}
    const allTasks = await this.prisma.task.findMany({
      take: limit,
      skip:offset
    })
      
      return allTasks

  }

  async findOneTask(id: number){
    
    const task = await this.prisma.task.findFirst({
      where:{
        id: id
      }
    })

    if(task?.name) return task

    throw new HttpException("Essa tarefa não existe", HttpStatus.NOT_FOUND)
    
  }

  async createOneTask(createTaskDto: CreateTaskDTO){
    try{
      const task = await this.prisma.task.create({
      data:{
        name: createTaskDto.name,
        description: createTaskDto.description,
        userId: createTaskDto.userId,
        completed: false
      }
    })

    return task
    } catch(err){

      throw new HttpException("Falha ao cadastrar uma tarefa", HttpStatus.BAD_REQUEST)
    }
  
    
  }

  async update(id: number, updateTaskDto: UpdateTaskDTO){
    try{
    const findTask = await this.prisma.task.findFirst({
      where: {id: id}
    })

    if(findTask){
       const task = await this.prisma.task.update({
        where: {
          id: findTask.id,
        },
        data: {
          name: updateTaskDto?.name ? updateTaskDto?.name : findTask.name,
          description: updateTaskDto?.description ? updateTaskDto?.description : findTask.description,
          completed: updateTaskDto?.completed ? updateTaskDto?.completed : findTask.completed
        }
       })
       return task;
    }

    throw new HttpException("Essa tarefa não existe !!", HttpStatus.NOT_FOUND)
    }catch(error){
      throw new HttpException("Falha ao atualizar essa tarefa...", HttpStatus.BAD_REQUEST)
      console.log(error)
    }
  }

  async delete(id: number){
    try{
    const deleteTask = await this.prisma.task.delete({
      where: {id:id}
    })

    if(deleteTask){
      return "Tarefa deletada com sucesso!!"
      }

    throw new HttpException("Essa tarefa não existe !!", HttpStatus.NOT_FOUND)
    
  }catch(error){
    throw new HttpException("Falha ao deletarr essa tarefa", HttpStatus.BAD_REQUEST)
    console.log(error)
    }
  }


  async deleteAllTasks(){
    try{
    
      const emptyTasks = await this.prisma.task.deleteMany()

    if(emptyTasks){
      return "todas as tarefas deletadas com sucesso!!"
      }

    
    
  }catch(error){
    throw new HttpException("Falha ao deletar todas as tarefas", HttpStatus.BAD_REQUEST)
    console.log(error)
    }
  }
}
