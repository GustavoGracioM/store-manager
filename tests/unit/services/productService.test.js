const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFound');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe('services/productService', () => {
  beforeEach(sinon.restore);
  describe('checkNotExists', () => {
    chai.use(chaiAsPromised);
    it('deve disparar um erro se o model der algum problema', () => {
      sinon.stub(productModel, 'exists').rejects();
      chai.expect(productService.checkIfExists(0))
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro NotFoundError se o model responder false', () => {
      sinon.stub(productModel, 'exists').resolves(false);
      chai.expect(productService.checkIfExists(0))
        .to.eventually.be.rejectedWith(NotFoundError);
    });

    it('deve resolver sem problemas se o model responder true', () => {
      sinon.stub(productModel, 'exists').resolves(true);
      chai.expect(productService.checkIfExists(0))
        .to.eventually.be.undefined;
    });
  });
});
