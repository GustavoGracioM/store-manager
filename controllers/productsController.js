const produtctService = require('../services/productService');

const productController = {
  async get(req, res) {
    const products = await produtctService.get();
    res.status(200).json(products);
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
  async edit(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    await produtctService.checkIfExists(id);
    await produtctService.edit(id, name);
    const saleUpdate = await produtctService.getById(id);
    res.status(200).json(saleUpdate);
  },
  async remove(req, res) {
    const { id } = req.params;
    await produtctService.checkIfExists(id);
    await produtctService.remove(id);
    res.status(204).end();
  },
};

module.exports = productController; 