import { Orderitem } from './../../../orderitems/entities/orderitem.entity';
export type SingleOrderDto = {
  id: number,
  payment_method: string,
  total_price: number,
  orderitem: {
    qty: number,
    price: number,
    sub_total_price: number,
    movieschedule: {
      start_time: number,
      end_time: number,
      price: number,
      studio: {
        studio_number: number,
        seat_capacity: number,
      },
      movie: {
        title: string,
        overview: string,
        poster: string,
      }
    }
  },
}
