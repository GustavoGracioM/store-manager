const { Router } = require('express');
const productController = require('../controllers/productsController');

const products = Router();

products.get('/', productController.get);
products.get('/:id', productController.getById);
products.post('/', productController.add);

module.exports = products;