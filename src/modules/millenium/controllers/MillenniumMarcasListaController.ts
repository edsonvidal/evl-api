import { Request, Response } from 'express';
import MillenniumMarcasListaService from '../services/MillenniumMarcasListaService';

export default class MillenniumMarcasListaController {
  public async index(request: Request, response: Response): Promise<Response> {
    //const { marca, cod_marca, descricao} = request.params;

    const service = new MillenniumMarcasListaService();

    //const result = await service.execute();
    const result = await service.execute('01');
    //console.log(result);
    //console.log(JSON.stringify(result));
    return response.json(result);

    //const teste = response.json(result);
    //console.log(teste);
    //return response.json(result);
  }
}
