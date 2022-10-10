const path = require('path')
const express = require('express')
const colors = require('colors')

const app = express()
const publicPath = path.join(__dirname, '../public')
const PORT = 3001

app.use(express.static(publicPath))

app.listen(PORT, () => console.log(`Server is running on port : `.green + `${PORT}`.cyan))