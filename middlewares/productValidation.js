const InvalidInformation = require('../errors/InvalidInformation');
const InvalidSyntax = require('../errors/InvalidSyntax');

const validation = {
  async name(req, res, next) {
    const { name } = req.body;
    if (!name) throw new InvalidInformation('"name" is required');
    if (name.length <= 5) {
      throw new InvalidSyntax('"name" length must be at least 5 characters long');
    }
    next();
  },
};

module.exports = validation; 