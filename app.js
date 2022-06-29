const express = require('express');
require('express-async-errors');
const products = require('./router/products');
const sales = require('./router/sales');

const app = express();

app.use(express.json());
app.use('/products', products);
app.use('/sales', sales);

app.use((err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'NotFoundError': res.status(404).json({ message }); break;
    case 'InvalidInformation': res.status(400).json({ message }); break;
    case 'InvalidSyntax': res.status(422).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
});

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;