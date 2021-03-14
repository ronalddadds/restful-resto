const express = require('express');
const morgan =  require('morgan');
const bodyParser = require('body-parser');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false})); // false = only support simple bodies for url encoded data
app.use(bodyParser.json());

// Set up a Middleware
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error,
         req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;