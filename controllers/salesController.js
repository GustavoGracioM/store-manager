const saleServices = require('../services/saleService');

const salesController = {
  async add(req, res) {
    const listSale = req.body;
    const saleId = await saleServices.addSale();
    listSale.forEach(async (l) => saleServices
      .addSaleProduct(saleId, Number(l.productId), Number(l.quantity)));
    const sales = await saleServices.getSaleById(saleId);
    res.status(201).json(sales);
  },
  async get(_req, res) {
    const sales = await saleServices.get();
    res.status(200).json(sales);
  },
  async getById(req, res) {
    const { id } = req.params;
    await saleServices.checkIfExists(id);
    const sales = await saleServices.getSaleProductById(id);
    res.json(sales);
  },
};

module.exports = salesController; 