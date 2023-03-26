import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const id = req.user.userId;
    return this.ordersService.create(createOrderDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    const id = req.user.userId;
    return this.ordersService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const id_user = req.user.userId;
    return this.ordersService.findOne(+id, id_user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req,
  ) {
    const id_user = req.user.userId;
    return this.ordersService.update(+id, updateOrderDto, id_user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const id_user = req.user.userId;
    return this.ordersService.remove(+id, id_user);
  }
}
