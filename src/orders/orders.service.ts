import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto, id: User) {
    const data = await this.orderRepository.create(createOrderDto);
    data.user = id;
    await this.orderRepository.save(data);
    return {
      status: 201,
      message: 'success create order',
      data: data,
    };
  }

  async findAll(id: number) {
    const data = await this.orderRepository.find({
      where: {
        user: { id: id },
      },
    });

    if (data.length === 0) {
      throw new NotFoundException();
    }

    return {
      status: 200,
      message: 'success get all order',
      data: data,
    };
  }

  async findOne(id: number, id_user: number) {
    const data = await this.orderRepository.findOne({
      where: { id: id, user: { id: id_user } },
    });

    if (!data) {
      throw new NotFoundException();
    }

    return {
      status: 200,
      message: 'order found',
      data: data,
    };
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, id_user: number) {
    const data = await this.orderRepository.findOne({
      where: { id: id, user: { id: id_user } },
    });
    if (!data) {
      throw new NotFoundException();
    }
    data.payment_method = updateOrderDto.payment_method;
    data.total_item_price = updateOrderDto.total_item_price;
    data.updated_at = new Date();
    await this.orderRepository.save(data);
    return {
      status: 200,
      message: 'order updated',
      data: data,
    };
  }

  async remove(id: number, id_user: number) {
    const data = await this.orderRepository.findOne({
      where: { id: id, user: { id: id_user } },
    });
    if (!data) {
      throw new NotFoundException();
    }
    await this.orderRepository.remove(data);
    return {
      status: 200,
      message: 'order deleted',
      data: data,
    };
  }

  async findOrder(orderId: number) {
    const data = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }
}
