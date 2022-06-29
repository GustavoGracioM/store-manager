const saleModel = require('../models/saleModel');

const serial = (saleId, sale) => {
  const newSerial = { productId: sale.product_id, quantity: sale.quantity };
  const resutl = {
    id: saleId,
    itemsSold: newSerial,
  };
  return resutl;
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
    const sales = await saleModel.getSalesById(id);
    return sales.map((sale) => serial(id, sale));
  },
};

module.exports = saleService;