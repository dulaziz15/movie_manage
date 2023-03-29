import { Tag } from './../tags/entities/tag.entity';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/request/create-movie.dto';
import { UpdateMovieDto } from './dto/request/update-movie.dto';
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

    for (const tagSingle of tag) {
      const tag = await this.tagService.checkTag(tagSingle);
      if (!tag) {
        throw new NotFoundException();
      }
      movieTag.push(tag);
    }
    data.movie_tag = movieTag;
    const movie = await this.movieRepository.save(data);
    return {
      status: 201,
      message: 'Movie created',
      data: movie,
    };
  }

  async findAll() {
    const data = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movie_tag', 'tag')
      .getMany();

    if (data.length === 0) {
      throw new NotFoundException();
    }

    return {
      status: 200,
      message: 'Movies found',
      data: data,
    };
  }

  async findOne(id: number) {
    const data = await this.movieRepository
      .createQueryBuilder('movie')
      .innerJoinAndSelect('movie.movie_tag', 'tag')
      .where('movie.id = :id', { id: id })
      .getOne();

    if (!data) {
      throw new NotFoundException();
    }

    return {
      status: 200,
      message: 'Movies found',
      data: data,
    };
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const data = await this.movieRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException();
    }
    data.title = updateMovieDto.title;
    data.overview = updateMovieDto.overview;
    data.poster = updateMovieDto.poster;
    data.play_until = updateMovieDto.play_until;
    const movie = await this.movieRepository.save(data);
    return {
      status: 200,
      message: 'Movie updated',
      data: movie,
    };
  }

  async findMovie(movieId: number): Promise<Movie> {
    const data = await this.movieRepository.findOne({ where: { id: movieId } });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }
}
