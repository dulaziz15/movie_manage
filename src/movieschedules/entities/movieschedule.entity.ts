import { Movie } from './../../movies/entities/movie.entity';
import { Studio } from './../../studios/entities/studio.entity';
import { Orderitem } from './../../orderitems/entities/orderitem.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Movieschedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.movieSchedule)
  movie: Movie;

  @ManyToOne(() => Studio, (studio) => studio.movieSchedule)
  studio: Studio;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  price: number;

  @CreateDateColumn()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Orderitem, (orderitem) => orderitem.movie_schedule)
  orderItems: Orderitem[];
}
