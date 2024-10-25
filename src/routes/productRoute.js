const {addProduct,getProducts} = require('../controllers/productController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const productRouter = express.Router();


productRouter.post('/', authMiddleware,addProduct);
productRouter.get('/',authMiddleware, getProducts);

module.exports = productRouter;