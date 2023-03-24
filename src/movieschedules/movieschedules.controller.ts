import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieschedulesService } from './movieschedules.service';
import { CreateMoviescheduleDto } from './dto/create-movieschedule.dto';
import { UpdateMoviescheduleDto } from './dto/update-movieschedule.dto';

@Controller('movieschedules')
export class MovieschedulesController {
  constructor(private readonly movieschedulesService: MovieschedulesService) {}

  @Post()
  create(@Body() createMoviescheduleDto: CreateMoviescheduleDto) {
    return this.movieschedulesService.create(createMoviescheduleDto);
  }

  @Get()
  findAll() {
    return this.movieschedulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieschedulesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMoviescheduleDto: UpdateMoviescheduleDto,
  ) {
    return this.movieschedulesService.update(+id, updateMoviescheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieschedulesService.remove(+id);
  }
}
