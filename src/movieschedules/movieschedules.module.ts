import { Movieschedule } from './entities/movieschedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieschedulesService } from './movieschedules.service';
import { MovieschedulesController } from './movieschedules.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movieschedule])],
  controllers: [MovieschedulesController],
  providers: [MovieschedulesService],
})
export class MovieschedulesModule {}
