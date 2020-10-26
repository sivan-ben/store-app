const express = require("express");
const ProductsModel = require("../models/products")
const product = express.Router();
const jwt = require('jsonwebtoken')
const UserModel = require("../models/users")

product.get('/searchProduct/:param', async (req, res, next) => {
    const productName = req.params;
    const { param } = productName
    const result = await ProductsModel.find({ productName: param });
    return res.json(result)
})

product.use(async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthotized req')
    }
    try {
        const { authorization } = req.headers
        const token = authorization.split(' ')[1]
        const verifayToken = await jwt.verify(token, process.env.SECRET)
        if (!verifayToken) throw new Error('token not valid')
        req.user = verifayToken
        const [findUserId] = await UserModel.find({ userId: verifayToken._doc.userId });
        if (!findUserId) throw new error()
    } catch (error) {
        res.status(500).json({ err: error.message, message: "error token" })
    }
    next()
})

product.get("/getCategory/:param", async (req, res, next) => {
    try {
        const categoryName = req.params;
        const { param } = categoryName
        const result = await ProductsModel.find({ category: param })
        if (!result) return next(new Error("error message"))
        return res.json(result)
    } catch (error) {
        console.log(error.message)
    }

})

product.post("/addToCart", async (req, res, next) => {
    try {
        const { size, product } = req.body
        const newProduct = { size: size, img: product.img, name: product.productName, price: product.price, code: product.code, gender: product.gender, onSale: product.onSale }
        const { user } = req
        const filter = user._doc.userId
        const result = await UserModel.findOneAndUpdate({ userId: filter }, { $push: { cart: newProduct, } });
        const [userCart] = await UserModel.find({ userId: filter });
        const productInCart = userCart.cart
        return res.json({ message: 'cart by user id', productInCart , user: user._doc});
    } catch (error) {
        return res.json({ message: 'err cart' });
    }


});

product.post("/addToOrder", async (req, res, next) => {
    try {
        const { user } = req
        const filter = user._doc.userId
        const result = await UserModel.findOneAndUpdate({ userId: filter }, { $push: { orders: req.body, } });
        const productDelete = await UserModel.updateOne({ userId: filter }, { $set: { cart: [] } });
        const [userCart] = await UserModel.find({ userId: filter });
        const productInOrders = userCart.orders
        console.log(productInCart)
        return res.json({ message: "Your new items on the way to you What fun you bought from us", productInOrders, user: user._doc });
    } catch (error) {
        res.json({ message: 'some error' });
    }
});

product.get("/getCart", async (req, res, next) => {
    try {
        const { user } = req
        const userId = user._doc.userId
        const [result] = await UserModel.find({ userId: userId });
        const productInCart = result.cart
        return res.json({ message: 'cart by user id', productInCart, user: user._doc });
    } catch (error) {
        return res.json({ message: 'err', error });
    }

})



product.post('/deleteProduct', async (req, res, next) => {
    try {
        const { user } = req
        const filter = user._doc.userId
        const productCode = req.body.code
        const productDelete = await UserModel.updateOne({ userId: filter }, { $pull: { cart: { code: productCode } } });
        const [userCart] = await UserModel.find({ userId: filter });
        const productInCart = userCart.cart
        return res.json({ message: 'product deleteds', productInCart, user: user._doc });
    } catch (error) {
        return res.json({ message: 'err' })
    }
})



module.exports = product;
