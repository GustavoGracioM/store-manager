const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const salesController = require('../../../controllers/salesController');
const saleServices = require('../../../services/saleService');

chai.use(chaiAsPromised);

const salesMock = [
  {
    saleId: 1,
    date: "2022-07-01T18:16:26.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2022-07-01T18:16:26.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2022-07-01T18:16:26.000Z",
    productId: 3,
    quantity: 15
  }
]

describe('controller/saleController', () => {
  beforeEach(sinon.restore);
  const response = {};
  const request = {};
  describe('get', () => {
    it('deve retorna staus 200', async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(saleServices, 'get').resolves(salesMock);
      await salesController.get(request, response);
      chai.expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('deve retorna um json com a lista de vendas', async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(saleServices, 'get').resolves(salesMock);
      await salesController.get(request, response);
      chai.expect(response.json.calledWith(salesMock)).to.be.equal(true);
    });
  });
});
