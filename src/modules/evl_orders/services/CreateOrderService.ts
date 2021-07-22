import CustomersRepository from '@modules/evl_customers/typeorm/repositories/CustomersRepository';
import ProductRepository from '@modules/evl_products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    /* Vamos consultar o cliente enviado na request */
    const customerExists = await customersRepository.findById(customer_id);

    /* Vamos retornar uma mensagem se o cliente informado na request não for encontrado */
    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    /* Vamos consultar os produtos enviado na request */
    const existsProducts = await productsRepository.findAllByIds(products);

    /* Vamos retornar uma mensagem se nenhum produto for encontrado na request */
    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    /* Vamos retornar os IDs do produtos encontrados na request */
    const existsProductsIds = existsProducts.map(product => product.id);

    /* Vamos retornar os produtos não encontrados na request*/
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    /* Vamos retornar uma mensagem se houver o 1o produto não encontrados na request */
    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      );
    }
    /* Vamos passar o array de produtos recebidos na request e filtar e verificar a cada item
    se a quantidade vendida é inferior ao estoque */
    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    /* Vamos verificar se a validação do filtro retornou itens com sem quantidade disponível */
    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
      );
    }

    /* Vamos recuperar o preço de tabela para cada produto recebidos na request */
    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    /* Vamos criar o registro do pedido */
    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    /* Vamos recuparar o registro de produtos do pedido criado */
    const { order_products } = order;

    /* Vamos atualizar o saldo do estoque de cada produto do pedido criado */
    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
