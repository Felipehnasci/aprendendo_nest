import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from "express";
import { timestamp } from "rxjs";

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost) {
      
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const errorResponse = exception.getResponse()

    console.log("Passando dentro do filter.............")

    response.status(status).json({
      status: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorResponse
    })


  }
}