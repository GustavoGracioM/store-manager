const connection = require('./connection');

const productModel = {
  async exists(id) {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[exists]] = await connection.query(sql, [id]);
    return !!exists;
  },
  async get() {
    const sql = 'SELECT id, name FROM StoreManager.products';
    const [products] = await connection.query(sql);
    return products;
  },
  async getById(id) {
    const sql = 'SELECT id, name FROM StoreManager.products WHERE id = ?';
    const [[product]] = await connection.query(sql, [id]);
    return product;
  },
};

module.exports = productModel;