const express = require("express");
const UserModel = require("../models/users")
const router = express.Router();
const joi = require('@hapi/joi')
const { hashPassword } = require('../utils/hashPassword')

const schema1 = joi.object({
    userId: joi.number().required(),
    password: joi.string().min(3).required(),
    passwordConfirm: joi.string().min(3).required(),
    email: joi.string().email().required(),
})

router.use(async (req, res, next) => {
    const { userId, password, passwordConfirm, email } = req.body.data
    if (password !== passwordConfirm) return res.json({ message: "password must be match" })
    const errors = schema1.validate({ password, userId, passwordConfirm, email });
    if (errors.error) {
        const { details } = errors.error
        return res.json({ message: details[0].message })
    }
    req.user = userId
    next();
})

router.post('/ckeckId', async (req, res, next) => {
    try {
        const { user } = req
        const [findUserId] = await UserModel.find({ userId: user });
        if (findUserId) return res.json({ message: "user id existe" })
        return res.json({ notExist: "user id confirm ,next", findUserId })
    } catch (error) {
        res.json(error.message)
    }
})



const schema2 = joi.object({
    userName: joi.string().required(),
    lastName: joi.string().required(),
    street: joi.string().required(),
    city: joi.string().required()
})

router.use(async (req, res, next) => {
    const { userId, userName, lastName, street, city } = req.body.data
    const errors = schema2.validate({ userName, lastName, street, city });
    if (errors.error) {
        const { details } = errors.error
        return res.json({ message: details[0].message })
    }
    req.userId = userId
    next();
})


router.post('/register', async (req, res, next) => {
    const { userId, password, email, userName, lastName, street, city } = req.body.data;
    console.log(req.body.data)
    const uaserPassword = await hashPassword(password)
    const result = await saveUser({ userId, uaserPassword, email, userName, lastName, street, city });
    if (!result) return next(new Error('error message'));
    return res.json({ message: 'User Registered' });
});

async function saveUser(user) {
    try {
        const newUser = new UserModel(user);
        console.log(newUser);
        const dbRes = await newUser.save();
        console.log('jhgjh', dbRes);
        return dbRes;
    } catch (ex) {
        console.log(ex.message);
        console.log('user is not saved..');
        return;
    }
}

module.exports = router;