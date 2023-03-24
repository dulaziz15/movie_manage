import { Movieschedule } from './../../movieschedules/entities/movieschedule.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column()
  poster: string;

  @CreateDateColumn()
  play_until: Date;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  delete_at: Date;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({
    name: 'movie_tag',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  movie_tag: Tag[];

  @OneToMany(() => Movieschedule, (movieschedule) => movieschedule.movie)
  movieSchedule: Movieschedule[];
}
