import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    TasksModule, 
    UsersModule,
    ConfigModule.forRoot()
  ],

  controllers: [AppController],
  
  providers: [AppService, ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes({
        path: "*",
        method: RequestMethod.ALL
      })
  }
}
