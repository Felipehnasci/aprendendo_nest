/* DTO = DATA TRANSFER OBJECT
  > VALIDAR DADOS
  > SE USA PARA REPRESENTAR QUAIS DADOS E EM QUAIS FORMATOS
   UMA DETERMINNADA CAMADA ACEITA E TRABALHA
*/ 

export class CreateTaskDTO{
  readonly name: string
  readonly description: string
}