import { Tag } from 'src/tags/entities/tag.entity';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/request/create-movie.dto';
import { Repository } from 'typeorm';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private tagService: TagsService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const { tag, ...result } = createMovieDto;
    const data = await this.movieRepository.create(createMovieDto);
    const movieTag: Tag[] = [];
    for (const singleTag of tag) {
      const checkTag = await this.tagService.checkTag(singleTag);
      if (!checkTag) {
        throw new NotFoundException();
      }
      movieTag.push(checkTag);
    }
    data.movie_tag = movieTag;
    const movie = await this.movieRepository.save(data);
    return {
      status: 201,
      message: 'Movie created',
      data: movie,
    };
  }
}
