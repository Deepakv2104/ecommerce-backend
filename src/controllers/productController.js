const Product = require('../models/productModel');

const addProduct =async(req, res)=>{
    const{product_name, price, category, description} = req.body;

    try{
        const product = new Product({product_name, price, category, description});
        await product.save();
        res.status(201).json({message:"added successfully"});
    }catch(error){
res.json({error});
    }
}

const getProducts = async(req,res)=>{
  try{ 
     const products = await Product.find() 
    res.status(200).json(products);
  }catch(error){
    res.status(500).json({error})
  }
}
module.exports = {addProduct, getProducts};