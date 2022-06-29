const express = require('express');
require('express-async-errors');
const products = require('./router/products');

const app = express();

app.use('/products', products);

app.use((err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'NotFoundError': res.status(404).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
});

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;