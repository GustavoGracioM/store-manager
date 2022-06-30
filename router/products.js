const { Router } = require('express');
const productController = require('../controllers/productsController');
const productValidation = require('../middlewares/productValidation');

const products = Router();

products.get('/', productController.get);
products.get('/:id', productController.getById);
products.post('/', productValidation.name, productController.add);
products.put('/:id', productValidation.name, productController.edit);

module.exports = products;