const express = require('express');
require('express-async-errors');
const products = require('./router/products');

const app = express();

app.use(express.json());
app.use('/products', products);

app.use((err, _req, res, _next) => {
  const { name, message, code } = err;
  switch (name) {
    case 'NotFoundError': res.status(404).json({ message }); break;
    case 'InvalidInformation': res.status(code).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
});

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;