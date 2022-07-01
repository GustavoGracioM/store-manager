const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const saleModel = require('../../../models/saleModel');
const connection = require('../../../models/connection');

chai.use(chaiAsPromised);

const salesMock = [
  [
    {
      saleId: 1,
      date: "2022-07-01T17:46:25.000Z",
      productId: 1,
      quantity: 5
    },
    {
      saleId: 1,
      date: "2022-07-01T17:46:25.000Z",
      productId: 2,
      quantity: 10
    },
    {
      saleId: 2,
      date: "2022-07-01T17:46:25.000Z",
      productId: 3,
      quantity: 15
    }
  ]
];

const saleMock = [
  {
    date: "2022-07-01T18:09:30.000Z",
    productId: 1,
    quantity: 5
  },
  {
    date: "2022-07-01T18:09:30.000Z",
    productId: 2,
    quantity: 10
  }
];

const insertIdMock = [{ insertId: 1 }];

describe('models/saleModel', () => {
  beforeEach(sinon.restore);

  describe('exists', () => {
    it('deve disparar um erro caso o mysql dê pau', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(saleModel.exists(1)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o mysql não retorne uma lista', () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      chai.expect(saleModel.exists(1)).to.eventually.be.rejected;
    });

    it('deve retornar false se não encontrar o item', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      chai.expect(saleModel.exists(1)).to.eventually.be.false;
    });

    it('deve retornar true se encontrar o item', () => {
      sinon.stub(connection, 'query').resolves([[{}]]);
      chai.expect(saleModel.exists(1)).to.eventually.be.true;
    });
  });

  describe('get', () => {
    it('deve retorna uma lista com todos as vendas', async () => {
      sinon.stub(connection, 'query').resolves(salesMock);
      const response = await saleModel.get();
      chai.expect(response).to.deep.equal(salesMock[0]);
    })
  });

  describe('getSalesById', () => {
    it('deve a venda certa com base no id passado ', async () => {
      sinon.stub(connection, 'query').resolves(saleMock);
      const response = await saleModel.getSalesById(1);
      chai.expect(response).to.deep.equal(saleMock[0]);
    })
  });

  describe('addSale', () => {
    it('deve adicionar com sucesso uma venda', async () => {
      sinon.stub(connection, 'query').resolves(insertIdMock);
      const response = await saleModel.addSale('sale');
      chai.expect(response).to.deep.equal(1);
    })
  });
});