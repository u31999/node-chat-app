const dotenv = require('dotenv').config()
const colors = require('colors')

const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const publicPath = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000


app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected'.yellow)

    socket.on('disconnect', () => {
    console.log('User is disconnected'.red)
    })

    
    socket.on('createMessage', (message) => {
        console.log('Created Message : ', message)

         
         socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

         socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))
        

        
    })
})



server.listen(PORT, () => console.log(`Server is running on port : `.green + `${PORT}`.cyan))