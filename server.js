// imports
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')

// initialize app
const app = express()

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

// listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
