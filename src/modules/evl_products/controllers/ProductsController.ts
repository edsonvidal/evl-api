import { AppResult } from '@shared/errors/AppResult';
import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);

    //try {
    //  const product = await updateProduct.execute({
    //    id,
    //    name,
    //    price,
    //    quantity,
    //  });
    //  return response.json(
    //    new ResultDto('Product updated!', true, product, null),
    //  );
    //} catch (error) {
    //  return response.json(
    //    new ResultDto('Product not updated!', false, null, error),
    //  );
    //}
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json([]);

    //try {
    //  await deleteProduct.execute({ id });
    //  return response.json(
    //    new ResultDto('Produto removido com sucesso!', true, null, null),
    //  );
    //} catch (error) {
    //  return response.json(
    //    new ResultDto('Não foi possível remover o produto', false, null, error),
    //  );
    //}
  }
}
