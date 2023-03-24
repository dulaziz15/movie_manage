import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviescheduleDto } from './create-movieschedule.dto';

export class UpdateMoviescheduleDto extends PartialType(
  CreateMoviescheduleDto,
) {}
