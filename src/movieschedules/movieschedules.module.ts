import { MoviesModule } from './../movies/movies.module';
import { StudiosModule } from './../studios/studios.module';
import { Movieschedule } from './entities/movieschedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieschedulesService } from './movieschedules.service';
import { MovieschedulesController } from './movieschedules.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movieschedule]),
    StudiosModule,
    MoviesModule,
  ],
  controllers: [MovieschedulesController],
  providers: [MovieschedulesService],
  exports: [MovieschedulesService],
})
export class MovieschedulesModule {}
