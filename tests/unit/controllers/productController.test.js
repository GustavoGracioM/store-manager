const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsController = require('../../../controllers/productsController');
const productService = require('../../../services/productService');

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

describe('controller/prosuctController', () => {
  beforeEach(sinon.restore);
  const response = {};
  const request = {};
  describe('get', () => {
    it('deve retorna staus 200', async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'get').resolves(productsMock);
      await productsController.get(request, response);
      chai.expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('deve retorna um json com a lista de vendas', async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'get').resolves(productsMock);
      await productsController.get(request, response);
      chai.expect(response.json.calledWith(productsMock)).to.be.equal(true);
    });
  });
});
