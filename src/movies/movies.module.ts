import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), TagsModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
