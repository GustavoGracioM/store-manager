const NotFoundError = require('../errors/NotFound');
const saleModel = require('../models/saleModel');

const salesSerial = (sale) => {
  const newSerial = { productId: sale.product_id, quantity: sale.quantity };
  return newSerial;
};

const salesProductsSerail = (sale) => {
  const newSerial = {
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  };
  return newSerial;
};

const saleService = {
  async checkIfExists(id) {
    const exists = await saleModel.exists(id);
    if (!exists) {
      throw new NotFoundError('Sale not found');
    }
  },
  async addSaleProduct(saleId, productId, quantity) {
    await saleModel.addSaleProduct(saleId, productId, quantity);
    await saleModel.getSalesById(saleId);
  },
  async addSale() {
    const insertId = await saleModel.addSale();
    return insertId;
  },
  async get() {
    const result = await saleModel.get();
    const sales = result.map((sale) => salesProductsSerail(sale));
    return sales;
  },
  async getSaleProductById(id) {
    const result = await saleModel.getSalesProductsById(id);
    const sales = result.map((sale) => salesProductsSerail(sale));
    return sales;
  },
  async getSaleById(id) {
    const result = await saleModel.getSalesById(id);
    const sales = result.map((sale) => salesSerial(sale));
    return { id, itemsSold: sales };
  },
};

module.exports = saleService;