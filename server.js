// imports
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')

// Initialize app
const app = express()

// Database Configuration
const mongoose = require('./config/db')

// set Port Configuration
const port = process.env.PORT ? process.env.PORT : 3000

// Require MiddleWares
const morgan = require('morgan')

// use MiddleWares
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.json())

// Root Route
app.get('/', (req, res) => {
  res.send('Your app is connected . . . ')
})

// Require Routers
const auctionRT = require('./routes/Auctions')
const itemsRT = require('./routes/items')
const userRT = require('./routes/User')
const AuthRT = require('./routes/Auth')
const AdminRT = require('./routes/AdminPage')

// use Routers
app.use('/auctions', auctionRT)
app.use('/items', itemsRT)
app.use('/users', userRT)
app.use('/auth', AuthRT)
app.use('/admin', AdminRT)

// Listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
