const connection = require('./connection');

const saleModel = {
  async exists(id) {
    const sql = 'SELECT * FROM StoreManager.sales WHERE id = ?';
    const [[exists]] = await connection.query(sql, [id]);
    return !!exists;
  },
  async addSale() {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [{ insertId }] = await connection.query(sql);
    return insertId;
  },
  async addSaleProduct(saleId, productId, quantity) {
    const sql = `
      INSERT INTO StoreManager.sales_products 
      (sale_id, product_id, quantity)
      VALUES (?, ?, ?);`;
    const [{ insertId }] = await connection
      .query(sql, [saleId, productId, quantity]);
    return insertId;
  },
  async get() {
    const sql = `
      SELECT * 
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS sa
      ON sp.sale_id = sa.id
      ORDER BY sp.sale_id, sp.product_id`;
    const [sales] = await connection.query(sql);
    return sales;
  },
  async getSalesById(saleId) {
    const sql = `
      SELECT product_id, quantity
      FROM StoreManager.sales_products
      WHERE sale_id = ?;`;
    const [sale] = await connection.query(sql, saleId);
    return sale;
  },
  async getSalesProductsById(id) {
    const sql = `
      SELECT sp.product_id, sp.quantity, sa.date 
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS sa
      ON sp.sale_id = sa.id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id, sp.product_id`;
    const [sales] = await connection.query(sql, [id]);
    return sales;
  },
};

module.exports = saleModel;