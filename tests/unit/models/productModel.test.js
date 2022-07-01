const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');

chai.use(chaiAsPromised);

const productsMock = [
  [
    {
      id: 1,
      name: "Martelo de Thor"
    },
    {
      id: 2,
      name: "Traje de encolhimento"
    },
    {
      id: 3,
      name: "Escudo do Capitão América"
    }
  ]
];

const productMock = [{ id: 1, name: "Martelo de Thor" }];

const insertIdMock = [{ insertId: 1 }];

describe('models/productModel', () => {
  beforeEach(sinon.restore);

  describe('exists', () => {
    it('deve disparar um erro caso o mysql dê algum problema', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(productModel.exists(1)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o mysql não retorne uma lista', () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      chai.expect(productModel.exists(1)).to.eventually.be.rejected;
    });

    it('deve retornar false se não encontrar o item', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      chai.expect(productModel.exists(1)).to.eventually.be.false;
    });

    it('deve retornar true se encontrar o item', () => {
      sinon.stub(connection, 'query').resolves([[{}]]);
      chai.expect(productModel.exists(1)).to.eventually.be.true;
    });
  });

  describe('get', () => {
    it('deve retorna uma lista com todos os produtos', async () => {
      sinon.stub(connection, 'query').resolves(productsMock);
      const response = await productModel.get();
      chai.expect(response).to.deep.equal(productsMock[0]);
    })
  });

  describe('getById', () => {
    it('deve o produto certo com base no id passado ', async () => {
      sinon.stub(connection, 'query').resolves([productMock]);
      const response = await productModel.getById(1);
      chai.expect(response).to.deep.equal(productMock[0]);
    })
  });

  describe('add', () => {
    it('deve adicionar com sucesso um produto', async () => {
      sinon.stub(connection, 'query').resolves(insertIdMock);
      const response = await productModel.add('product');
      chai.expect(response).to.deep.equal(1);
    })
  });
});