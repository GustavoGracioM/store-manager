const productModel = require('../models/productModel');
const NotFoundError = require('../errors/NotFound');
const InvalidInformation = require('../errors/InvalidInformation');

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
  async add(name) {
    const id = await productModel.add(name);
    if (!id) throw new InvalidInformation('Product not insered');
    const newProduct = await productModel.getById(id);
    return newProduct;
  },
  async edit(id, name) {
    await productModel.edit(id, name);
  },
  async remove(id) {
    await productModel.remove(id);
  },
};

module.exports = produtctService;