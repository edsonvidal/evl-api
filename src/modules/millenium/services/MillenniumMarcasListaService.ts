import axios from 'axios';

interface IRequest {
  marca: number;
  cod_marca: string;
}

interface IResponse {
  marca: number;
  descricao: string;
  cod_marca: string;
}

class Marca {
  marca: number;
  cod_marca: string;
  descricao: string;

  constructor({ marca, cod_marca, descricao }) {
    this.marca = marca;
    this.cod_marca = cod_marca;
    this.descricao = descricao;
  }
}

class ListMarcaService {
  private readonly _address = 'http://54.94.224.204:6017/api/';
  private readonly _method = 'millenium/marcas/listar';
  private readonly _format = '?$format=json';
  private readonly _authType = 'Basic ';
  private readonly _authToken = 'YXBpOkxMZWUyMDAwQA==';

  public async execute(cod_marca?: string, marca?: number): Promise<any> {
    const axios = require('axios');
    const data = '';

    const config = {
      method: 'get',
      //url: 'http://54.94.224.204:6017/api/millenium/marcas/listar?$format=json',
      url: `${this._address}${this._method}${this._format}`,
      headers: {
        //'Authorization': 'Basic YXBpOkxMZWUyMDAwQA=='
        Authorization: `${this._authType}${this._authToken}`,
      },
      data: { cod_marca, marca },
    };

    await axios(config)
      .then(function (response: { data: any }) {
        //console.log(JSON.stringify(response.data));
        const resultData = JSON.stringify(response.data.value);
        //const resultData = new Marca(response.data.value);
        console.log(resultData);
        //console.log(JSON.stringify(resultData));
        return resultData;
      })
      .catch(function (error: any) {
        //console.log(error);
        const resultData = JSON.stringify(error);
        return resultData;
      });
  }
}

export default ListMarcaService;
