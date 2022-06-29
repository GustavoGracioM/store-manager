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
  async add(req, res) {
    const { name } = req.body;
    const newProduct = await produtctService.add(name);
    res.status(201).json(newProduct);
  },
};

module.exports = productController; 