import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    /* Vamos consultar a ordem enviado na request */
    const order = await ordersRepository.findById(id);

    /* Vamos retornar uma mensagem se a ordem informada não for encontrada */
    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
