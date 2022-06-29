const connection = require('./connection');

const saleModel = {
  async addSaleProduct(saleId, productId, quantity) {
    const sql = `
      INSERT INTO StoreManager.sales_products 
      (sale_id, product_id, quantity)
      VALUES (?, ?, ?);`;
    const [{ insertId }] = await connection
      .query(sql, [saleId, productId, quantity]);
    return insertId;
  },
  async addSale() {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [{ insertId }] = await connection.query(sql);
    return insertId;
  },
  async getSalesById(saleId) {
    const sql = `
      SELECT product_id, quantity
      FROM StoreManager.sales_products
      WHERE sale_id = ?;`;
    const [sale] = await connection.query(sql, saleId);
    return sale;
  },
};

module.exports = saleModel;