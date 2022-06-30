const saleModel = require('../models/saleModel');

const serial = (sale) => {
  const newSerial = { productId: sale.product_id, quantity: sale.quantity };
  return newSerial;
};

const saleService = {
  async addSaleProduct(saleId, productId, quantity) {
    await saleModel.addSaleProduct(saleId, productId, quantity);
    await saleModel.getSalesById(saleId);
  },
  async addSale() {
    const insertId = await saleModel.addSale();
    return insertId;
  },
  async getSaleProduct(id) {
    const result = await saleModel.getSalesById(id);
    const sales = result.map((sale) => serial(sale));
    return { id, itemsSold: sales };
  },
};

module.exports = saleService;