const { Router } = require('express');
const salesController = require('../controllers/salesController');
const validation = require('../middlewares/saleValidation');

const sales = Router();

sales.post('/', validation.productId, validation.quantity, salesController.add);

module.exports = sales;