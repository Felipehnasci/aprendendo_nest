import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";


export class AddHeaderInteceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      const response = context.switchToHttp().getResponse()

      response.setHeader('X-Custom', 'Valor chave 123')

      return next.handle()
  }
}