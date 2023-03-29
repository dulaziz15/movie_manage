import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MovieschedulesService } from './movieschedules.service';
import { CreateMoviescheduleDto } from './dto/create-movieschedule.dto';
import { UpdateMoviescheduleDto } from './dto/update-movieschedule.dto';

@Controller('movieschedules')
export class MovieschedulesController {
  constructor(private readonly movieschedulesService: MovieschedulesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMoviescheduleDto: CreateMoviescheduleDto) {
    return this.movieschedulesService.create(createMoviescheduleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.movieschedulesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movieschedulesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMoviescheduleDto: UpdateMoviescheduleDto,
  ) {
    return this.movieschedulesService.update(+id, updateMoviescheduleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieschedulesService.remove(+id);
  }
}
