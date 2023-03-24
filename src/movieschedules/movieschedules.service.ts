import { Injectable } from '@nestjs/common';
import { CreateMoviescheduleDto } from './dto/create-movieschedule.dto';
import { UpdateMoviescheduleDto } from './dto/update-movieschedule.dto';

@Injectable()
export class MovieschedulesService {
  create(createMoviescheduleDto: CreateMoviescheduleDto) {
    return 'This action adds a new movieschedule';
  }

  findAll() {
    return `This action returns all movieschedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieschedule`;
  }

  update(id: number, updateMoviescheduleDto: UpdateMoviescheduleDto) {
    return `This action updates a #${id} movieschedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieschedule`;
  }
}
