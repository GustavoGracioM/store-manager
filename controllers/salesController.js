// const produtctService = require('../services/productService');
const saleServices = require('../services/saleService');

const salesController = {
  async add(req, res) {
    const listSale = req.body;
    // listSale.forEach(async l => {
    //   await produtctService.checkIfExists(Number(l.productId));
    // });
    const saleId = await saleServices.addSale();
    listSale.forEach(async (l) => saleServices
      .addSaleProduct(saleId, Number(l.productId), Number(l.quantity)));
    const sales = await saleServices.getSaleProduct(saleId);
    res.status(201).json(sales);
  },
};

module.exports = salesController; 