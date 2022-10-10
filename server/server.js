const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const app = express()
const publicPath = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000

app.use(express.static(publicPath))

app.listen(PORT, () => console.log(`Server is running on port : `.green + `${PORT}`.cyan))