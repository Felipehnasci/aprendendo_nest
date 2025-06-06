/* DTO = DATA TRANSFER OBJECT
  > VALIDAR DADOS
  > SE USA PARA REPRESENTAR QUAIS DADOS E EM QUAIS FORMATOS
   UMA DETERMINNADA CAMADA ACEITA E TRABALHA
*/
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

 

export class CreateTaskDTO{
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly name: string
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly description: string
}