// imports
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')

const { Server } = require('socket.io')
const cron = require('node-cron')

// initialize app
const app = express()
const http = require('http')
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

global.io = io

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

  socket.on('joinUser', (userId) => {
    socket.join(userId)
    console.log(`${userId} is in ${socket.id}`)
  })

  socket.on('leaveUser', (userId) => {
    socket.leave(userId)
    console.log(`bye bye ${userId}`)
  })

  // emit changes in autobidding to frontend

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
const WatchListRT = require('./routes/WatchList')
// use routers
app.use('/auctions', auctionRT)
app.use('/items', itemsRT)
app.use('/users', userRT)
app.use('/auth', AuthRT)
app.use('/admin', AdminRT)
app.use('/watchlist', WatchListRT)

// TODO 1: Cron Job to check Auctions' status
const checkAuctions = require('./jobs/auctionStatus')
cron.schedule('* * * * *', () => {
  console.log('Running checkAuction Job')
  checkAuctions()
})

const makeAutoBidding = require('./jobs/autoBidding')
cron.schedule('30 * * * * *', () => {
  console.log('running autobidding')
  makeAutoBidding()
})
// listener
// io.listen(5045)
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
