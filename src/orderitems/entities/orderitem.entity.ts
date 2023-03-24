import { Movieschedule } from './../../movieschedules/entities/movieschedule.entity';
import { Order } from './../../orders/entities/order.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Orderitem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Movieschedule, (movieschedule) => movieschedule.orderItems)
  movie_schedule: Movieschedule;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  sub_total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
