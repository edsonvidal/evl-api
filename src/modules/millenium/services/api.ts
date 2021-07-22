const axios = require('axios');
const data = '';

const config = {
  method: 'get',
  url:
    'http://179.124.195.158:6017/api/millenium/filiais/lista_simples?$format=json',
  headers: {
    Authorization: 'Basic cG16LWFwaTozckdmM1M3aA==',
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
