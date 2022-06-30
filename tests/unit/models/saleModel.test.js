const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const saleModel = require('../../../models/saleModel');
const connection = require('../../../models/connection');

chai.use(chaiAsPromised);

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
});