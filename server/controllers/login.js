const express = require("express");
const router = express.Router();
const UserModel = require("../models/users")
const jwt = require('jsonwebtoken')


router.post('/login', async (req, res, next) => {
    try {
        const { userId } = req.body;
        const [findUserId] = await UserModel.find({ userId: userId });
        if (!findUserId) return res.json({ message: "user not found" })
        const jwtToken = await getJwt({ ...findUserId, password: null })
        return res.json({ message: 'user is loged in', result: findUserId, token: jwtToken });
    } catch (error) {
        console.log(error, "err from login")
    }
});
module.exports = router;

function getJwt(p) {
    return new Promise((resolve, reject) => {
        jwt.sign(p, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) reject("error")
            resolve(token)
        })
    })
}