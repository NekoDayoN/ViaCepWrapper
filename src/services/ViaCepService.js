const axios = require('axios');

class ViaCepService {
    search(cep) {
        if(!(/[0-9]{5}-[0-9]{3}/).test(cep)) {
            return new Promise((res, rej) => {
                rej(new Error("Invalid CEP given."));
            });
        }

        return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.data)
            .catch(error => error);
    }
}

module.exports = ViaCepService;