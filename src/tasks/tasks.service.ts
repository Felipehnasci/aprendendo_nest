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
    const task = await this.prisma.task.create({
      data:{
        name: createTaskDto.name,
        description: createTaskDto.description,
        completed: false
      }
    })

    return task
    
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
        data: updateTaskDto
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
}
