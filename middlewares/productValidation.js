const InvalidInformation = require('../errors/InvalidInformation');

const validation = {
  async name(req, res, next) {
    const { name } = req.body;
    if (!name) throw new InvalidInformation('"name" is required', 400);
    if (name.length <= 5) {
      throw new InvalidInformation('"name" length must be at least 5 characters long', 422);
    }
    next();
  },
};

module.exports = validation; 