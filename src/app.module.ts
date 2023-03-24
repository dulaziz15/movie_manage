import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { OrdersModule } from './orders/orders.module';
import { OrderitemsModule } from './orderitems/orderitems.module';
import { StudiosModule } from './studios/studios.module';
import { TagsModule } from './tags/tags.module';
import { MovieschedulesModule } from './movieschedules/movieschedules.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'movie',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    MoviesModule,
    OrdersModule,
    OrderitemsModule,
    StudiosModule,
    TagsModule,
    MovieschedulesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
