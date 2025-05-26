import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/tasks.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  private tasks: Task[] = [
    {
      id: 1,
      name: "Fazer o café da manhã",
      description: "Ovos com pão",
      completed: false,
    }
  ]

  findAllTasks(){
    return this.tasks;
  }

  findOneTask(id: String){
    
    const task = this.tasks.find( task => task.id == Number(id))

    if (task) return task

    //throw new NotFoundException("Esta tarefa não existe!!!")
    throw new HttpException("Essa tarefa não existe !!", HttpStatus.NOT_FOUND)
  }

  createOneTask(createTaskDto: CreateTaskDTO){
    const newId = this.tasks.length + 1

    const newTask = {
      id: newId,
      ...createTaskDto,
      completed: false
    }

    this.tasks.push(newTask)

    return newTask
  }

  update(id: string, updateTaskDto: UpdateTaskDTO){
    const taskIndex = this.tasks.findIndex(task => task.id === Number(id))
    
    if(taskIndex<0){
      throw new HttpException("Essa tarefa não existe!!!", HttpStatus.NOT_FOUND)
    }

      const taskItem = this.tasks[taskIndex]

      this.tasks[taskIndex] = {
        ...taskItem,
        ...updateTaskDto,
      }

    return this.tasks[taskIndex]
  }

  delete(id: string){
    const taskIndex = this.tasks.findIndex(task => task.id === Number(id))
    
    if(taskIndex<0){
      throw new NotFoundException("Essa tarefa não existe!!")
    }

    this.tasks.splice(taskIndex, 1)
    return {
      message: "Tarefa excluida com sucesso!!!!!!!!"
    }
  }
}
