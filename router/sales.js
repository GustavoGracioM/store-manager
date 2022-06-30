const { Router } = require('express');
const salesController = require('../controllers/salesController');
const validation = require('../middlewares/saleValidation');

const sales = Router();

sales.post('/', validation.productId, validation.quantity, salesController.add);
sales.get('/', salesController.get);
sales.get('/:id', salesController.getById);

module.exports = sales;