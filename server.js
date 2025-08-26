// imports
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')

// initialize app
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

// socket connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // join specific auction room
  socket.on('joinAuction', (auctionId) => {
    socket.join(auctionId)
    console.log(`User ${socket.id} joined auction ${auctionId}`)
  })

  // leave auction
  socket.on('leaveAuction', (auctionId) => {
    socket.leave(auctionId)
    console.log(`User ${socket.id} left auction ${auctionId}`)
  })

  // new bid event
  socket.on('newBid', (data) => {
    const { auctionId, userId, amount } = data
    console.log(`New bid in auction ${auctionId}: User ${userId} bid ${amount}`)
  })

  // auction status changed event
  socket.on('auctionStatusChanged', (data) => {
    const { auctionId, status } = data
    console.log(`Auction ${auctionId} status changed to ${status}`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// db config
const mongoose = require('./config/db')

// set port config
const port = process.env.PORT ? process.env.PORT : 3000

// require middleware
const morgan = require('morgan')

// use middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// root route
app.get('/', (req, res) => {
  res.send('Your app is connected . . . ')
})

// require routes
const auctionRT = require('./routes/Auctions')
const itemsRT = require('./routes/items')
const userRT = require('./routes/User')
const AuthRT = require('./routes/Auth')
const AdminRT = require('./routes/AdminPage')

// use routers
app.use('/auctions', auctionRT)
app.use('/items', itemsRT)
app.use('/users', userRT)
app.use('/auth', AuthRT)
app.use('/admin', AdminRT)

// TODO 1: Cron Job to check Auctions' status

// listener
io.listen(5000, () => {
  console.log('websocket')
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

module.exports = { io, server }
