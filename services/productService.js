const productModel = require('../models/productModel');
const NotFoundError = require('../errors/NotFoundError');

const produtctService = {
  async checkIfExists(id) {
    const exists = await productModel.exists(id);
    if (!exists) {
      throw new NotFoundError('Product not found');
    }
  },
  async get() {
    const produtcts = await productModel.get();
    return produtcts;
  },
  async getById(id) {
    const produtct = await productModel.getById(id);
    return produtct;
  },
};

module.exports = produtctService;