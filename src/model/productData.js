const mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({

    productId: Number,
    name: String,
    code: String,
    releaseDate: String,
    description: String,
    price: Number,
    rating: Number,
    imageUrl: String
    
});

var ProductModel = mongoose.model('product',ProductSchema);

module.exports = ProductModel;