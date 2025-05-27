import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsString, MinLength } from "class-validator";
import { CreateTaskDTO } from "./create-task.dto";

export class UpdateTaskDTO extends PartialType(CreateTaskDTO){

  @IsBoolean()
  readonly completed?: boolean;
}