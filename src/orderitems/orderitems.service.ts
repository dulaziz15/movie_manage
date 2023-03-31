import { OrdersService } from './../orders/orders.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Orderitem } from './entities/orderitem.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';
import { Repository } from 'typeorm';
import { MovieschedulesService } from 'src/movieschedules/movieschedules.service';

@Injectable()
export class OrderitemsService {
  constructor(
    @InjectRepository(Orderitem)
    private orderRepository: Repository<Orderitem>,
    private moviescheduleService: MovieschedulesService,
    private ordersService: OrdersService,
  ) {}

  async create(createOrderitemDto: CreateOrderitemDto) {
    const { orderId, moviescheduleId, ...result } = createOrderitemDto;
    const order = await this.ordersService.findOrder(orderId);
    const movieschedule = await this.moviescheduleService.findMovieschedule(
      moviescheduleId,
    );
    const data = await this.orderRepository.create(createOrderitemDto);
    data.movie_schedule = movieschedule;
    data.order = order;
    await this.orderRepository.save(data);
    return {
      status: 201,
      message: 'Orderitem successfully created',
      data: data,
    };
  }

  async findAll() {
    const data = await this.orderRepository
      .createQueryBuilder('orderitem')
      .leftJoinAndSelect('orderitem.order', 'order')
      .leftJoinAndSelect('orderitem.movie_schedule', 'movie')
      .getMany();
    if (data.length === 0) {
      throw new NotFoundException('');
    }
    return {
      status: 200,
      message: 'Orderitems successfully retrieved',
      data: data,
    };
  }

  async findOne(id: number) {
    const data = await this.orderRepository
      .createQueryBuilder('orderitem')
      .innerJoinAndSelect('orderitem.movie_schedule', 'movieschedule')
      .innerJoinAndSelect('orderitem.order', 'order')
      .where('orderitem.id = :id', { id: id })
      .getOne();
    if (!data) {
      throw new NotFoundException();
    }
    return {
      status: 200,
      message: 'Orderitem successfully retrieved',
      data: data,
    };
  }

  update(id: number, updateOrderitemDto: UpdateOrderitemDto) {
    return `This action updates a #${id} orderitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderitem`;
  }

  async cari(id: number) {
    console.log(id);
  }
}
