import { MoviesService } from './../movies/movies.service';
import { StudiosService } from './../studios/studios.service';
import { Studio } from './../studios/entities/studio.entity';
import { Movieschedule } from './entities/movieschedule.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMoviescheduleDto } from './dto/create-movieschedule.dto';
import { UpdateMoviescheduleDto } from './dto/update-movieschedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MovieschedulesService {
  constructor(
    @InjectRepository(Movieschedule)
    private movieschedulesRepository: Repository<Movieschedule>,
    private studiosService: StudiosService,
    private moviesService: MoviesService,
  ) {}

  async create(createMoviescheduleDto: CreateMoviescheduleDto) {
    const { movieId, studioId, ...result } = createMoviescheduleDto;
    const data = await this.movieschedulesRepository.create(
      createMoviescheduleDto,
    );
    const studio = await this.studiosService.findStudio(studioId);
    const movie = await this.moviesService.findMovie(movieId);
    data.movie = movie;
    data.studio = studio;
    const movieschedule = await this.movieschedulesRepository.save(data);
    return {
      status: 201,
      message: 'data created successfully',
      data: movieschedule,
    };
  }

  async findAll() {
    const data = await this.movieschedulesRepository
      .createQueryBuilder('movieschedule')
      .innerJoinAndSelect('movieschedule.movie', 'movie')
      .innerJoinAndSelect('movieschedule.studio', 'studio')
      .getMany();

    if (data.length === 0) {
      throw new NotFoundException();
    }

    return {
      status: 200,
      message: 'data retrieved successfully',
      data: data,
    };
  }

  async findOne(id: number) {
    const data = await this.movieschedulesRepository
      .createQueryBuilder('movieschedule')
      .innerJoinAndSelect('movieschedule.movie', 'movie')
      .innerJoinAndSelect('movieschedule.studio', 'studio')
      .where('movieschedule.id = :id', { id: id })
      .getOne();

    if (!data) {
      throw new NotFoundException();
    }

    return {
      status: 200,
      message: 'data retrieved successfully',
      data: data,
    };
  }

  async update(id: number, updateMoviescheduleDto: UpdateMoviescheduleDto) {
    const data = await this.movieschedulesRepository.findOne({
      where: { id: id },
    });
    if (!data) {
      throw new NotFoundException();
    }
    data.start_time = updateMoviescheduleDto.start_time;
    data.end_time = updateMoviescheduleDto.end_time;
    data.price = updateMoviescheduleDto.price;
    const studio = await this.studiosService.findStudio(
      updateMoviescheduleDto.studioId,
    );
    const movie = await this.moviesService.findMovie(
      updateMoviescheduleDto.movieId,
    );
    data.movie = movie;
    data.studio = studio;
    const movieschedule = await this.movieschedulesRepository.save(data);
    return {
      status: 200,
      message: 'data updated successfully',
      data: movieschedule,
    };
  }

  async remove(id: number) {
    const data = await this.movieschedulesRepository.findOne({
      where: { id: id },
    });
    if (!data) {
      throw new NotFoundException();
    }
    const movieschedule = await this.movieschedulesRepository.remove(data);
    return {
      status: 200,
      message: 'data deleted successfully',
      data: movieschedule,
    };
  }

  async findMovieschedule(moviescheduleId: number) {
    const data = await this.movieschedulesRepository.findOne({
      where: { id: moviescheduleId },
    });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }
}
