import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/tasks.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) {}

  private tasks: Task[] = [
    {
      id: 1,
      name: "Fazer o café da manhã",
      description: "Ovos com pão",
      completed: false,
    }
  ]

  async findAllTasks(){
    const allTasks = await this.prisma.task.findMany()
    return allTasks
  }

  async findOneTask(id: number){
    
    const task = await this.prisma.task.findFirst({
      where: {
        id: id
      }
    })
    if(task?.name) return task
    throw new HttpException("Essa tarefa não existe!!!", HttpStatus.NOT_FOUND)
  }

  async createOneTask(createTaskDto: CreateTaskDTO){
    const newTask = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        completed: false,
      }
     })
     return newTask
  }

  async update(id: number, updateTaskDto: UpdateTaskDTO){
    try{
      const findTask = await this.prisma.task.findFirst({
      where: {
        id: id
      }
    })
    if(!findTask){
      throw new NotFoundException("Essa tarefa não existe!!")
    }

    const updatedTask = await this.prisma.task.update({
      where: {
        id: findTask.id
      },
      data: updateTaskDto
    })
    return updatedTask
    } catch(err){
      throw new HttpException("Erro ao deletar a tarefa", HttpStatus.NOT_FOUND);
    }
  }
  

  async delete(id: number){
    try{ 
        const findTask = await this.prisma.task.findFirst({
          where: {
            id: id
          }
        })
        if(!findTask){
          throw new NotFoundException("Essa tarefa não existe!!")
        }
        await this.prisma.task.delete({
          where: {
            id: findTask.id
          }
        })

      return { message: "Tarefa deletada com sucesso!" }

    }catch (error) {
      throw new HttpException("Erro ao deletar a tarefa", HttpStatus.NOT_FOUND);
    }
  }
}
