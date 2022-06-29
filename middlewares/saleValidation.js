const InvalidInformation = require('../errors/InvalidInformation');
const InvalidSyntax = require('../errors/InvalidSyntax');

const validation = {
  async productId(req, res, next) {
    const list = req.body;
    list.forEach((l) => {
      if (!l.productId) throw new InvalidInformation('"productId" is required');
    })
    next();
  },
  async quantity(req, res, next) {
    const list = req.body;
    list.forEach((l) => {
      if (!l.quantity && l.quantity != 0) throw new InvalidInformation('"quantity" is required');
      if (l.quantity < 1) {
        throw new InvalidSyntax('"quantity" must be greater than or equal to 1');
      }
    })
    next();
  },
};

module.exports = validation; 