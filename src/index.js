const ViaCepService = require('./services/ViaCepService');

const cep = new ViaCepService();


cep.search('01001-000')
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });