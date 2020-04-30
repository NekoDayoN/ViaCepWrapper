const expect = require('chai').expect;
const ViaCepService = require('../../src/services/ViaCepService');
const nock = require('nock');

global.fetch = require('node-fetch');

describe('ViaCepService', () => {
    const sut = new ViaCepService();

    it('should exist', () => {
        expect(ViaCepService).to.exist;
        expect(sut).to.be.an.instanceof(ViaCepService);
    });

    describe('.search()', () => {

        const expectedObj = {
            cep: "01001-000",
            logradouro: "Praça da Sé",
            complemento: "lado ímpar",
            bairro: "Sé",
            localidade: "São Paulo",
            uf: "SP",
            unidade: "",
            ibge: "3550308",
            gia: "1004"
        };

        beforeEach(() => {
            nock('https://viacep.com.br')
                .get('/ws/01001-000/json/')
                .reply(200, expectedObj);
        })

        it('should exist', () => {
            expect(sut.search).to.exist;
            expect(sut.search).to.be.an.instanceof(Function);
        });

        it('should return an Error when cep without dash', () => {
            sut.search('01001000')
                .then(res => res)
                .catch(err => {
                    expect(err).to.be.an.instanceof(Error);
                });
        });

        it('should return an "Praça da Sé" from object.logradouro when search("01001-000")', async () => {
            sut.search('01001-000')
                .then(res => {
                    expect(res).to.be.eql(expectedObj);
                }).catch(err => err);
        });
    });
});