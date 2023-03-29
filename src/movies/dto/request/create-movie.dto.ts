import { IsOptional } from 'class-validator';

export class CreateMovieDto {
  title: string;
  overview: string;
  poster: string;
  tag: number[];

  @IsOptional()
  play_until: Date;
}
