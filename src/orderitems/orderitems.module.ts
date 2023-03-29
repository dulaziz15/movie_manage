import { OrdersModule } from './../orders/orders.module';
import { Orderitem } from './entities/orderitem.entity';
import { Module } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service';
import { OrderitemsController } from './orderitems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieschedulesModule } from 'src/movieschedules/movieschedules.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orderitem]),
    OrdersModule,
    MovieschedulesModule,
  ],
  controllers: [OrderitemsController],
  providers: [OrderitemsService],
})
export class OrderitemsModule {}
