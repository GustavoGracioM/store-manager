const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFound');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');

describe('checkNotExists', () => {
  beforeEach(sinon.restore);
  chai.use(chaiAsPromised);
  it('deve disparar um erro se o model der algum problema', () => {
    sinon.stub(saleModel, 'exists').rejects();
    chai.expect(saleService.checkIfExists(0))
      .to.eventually.be.rejected;
  });

  it('deve disparar um erro NotFoundError se o model responder false', () => {
    sinon.stub(saleModel, 'exists').resolves(false);
    chai.expect(saleService.checkIfExists(0))
      .to.eventually.be.rejectedWith(NotFoundError);
  });

  it('deve resolver sem problemas se o model responder true', () => {
    sinon.stub(saleModel, 'exists').resolves(true);
    chai.expect(saleService.checkIfExists(0))
      .to.eventually.be.undefined;
  });
});