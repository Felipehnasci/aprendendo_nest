import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {

  listAllTasks(){
    return [
      { id: 1, task: "comprar pao"}
    ]
  }

  findOneTask(id: String){
    return "Buscar uma tarefa com id: " + id
  }

  createOneTask(body : any){
    console.log("TAREFA CRIADA COM SUCESSO")
    return body
  }
}
