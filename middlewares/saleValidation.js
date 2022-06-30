const InvalidInformation = require('../errors/InvalidInformation');
const InvalidSyntax = require('../errors/InvalidSyntax');
const produtctService = require('../services/productService');

const validation = {
  async productId(req, _res, next) {
    const listSale = req.body;
    listSale.forEach((l) => {
      if (!l.productId) throw new InvalidInformation('"productId" is required');
    });
    const exists = listSale.map((l) => produtctService.checkIfExists(l.productId));
    await Promise.all(exists);
    next();
  },
  async quantity(req, _res, next) {
    const list = req.body;
    list.forEach((l) => {
      if (!l.quantity && l.quantity !== 0) throw new InvalidInformation('"quantity" is required');
      if (l.quantity < 1) {
        throw new InvalidSyntax('"quantity" must be greater than or equal to 1');
      }
    });
    next();
  },
};

module.exports = validation; 