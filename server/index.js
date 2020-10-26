require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const dbConnection = require("./database/db");
const cors = require('cors')
const register = require('./controllers/register')
const login = require('./controllers/login')
const products = require('./controllers/products')

app.use(cors())
dbConnection();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/product', products)
app.use(login)
app.use(register)



app.listen(process.env.PORT, () => {
  console.log(`listening to ${process.env.PORT}`);
});
