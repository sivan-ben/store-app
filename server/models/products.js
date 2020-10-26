const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    sizeInStock: {
        type: String
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    onSale: {
        type: Boolean,
        require: true
    },
    category: {
        type: String
    }

})

const ProductsModel = mongoose.model("products", ProductsSchema)

module.exports = ProductsModel;