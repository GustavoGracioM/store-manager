const produtctService = require('../services/productService');

const productController = {
  async get(req, res) {
    const products = await produtctService.get();
    res.json(products);
  },
  async getById(req, res) {
    const { id } = req.params;
    await produtctService.checkIfExists(id);
    const product = await produtctService.getById(id);
    res.json(product);
  },
};

module.exports = productController; 