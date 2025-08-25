// seeder.js
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Import models
import User from './models/User.js'
import Item from './models/Item.js'
import Auction from './models/Auction.js'
import Bid from './models/Bidding.js'
import Transaction from './models/Transaction.js'

let MONGO_URI =
  'mongodb+srv://maryamaliredha:iKoNJP9UFsPtdko3@maryam-cluster.ijdktda.mongodb.net/mazad'

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ MongoDB connected')

    // Clear old data
    await User.deleteMany({})
    await Item.deleteMany({})
    await Auction.deleteMany({})
    await Bid.deleteMany({})
    await Transaction.deleteMany({})
    console.log('🗑️ Old data cleared')

    // Create Users
    const password = await bcrypt.hash('password123', 10)

    const users = await User.insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        passwordHash: 'password',
        type: 'user',
        balance: 5000,
        verified: true
      },
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        passwordHash: password,
        type: 'admin',
        balance: 10000,
        verified: true
      }
    ])
    console.log('👤 Users created')

    // Create Items
    const items = await Item.insertMany([
      {
        name: 'Luxury Watch',
        description: 'Rolex Submariner',
        price: 1000,
        category: 'watches',
        ownerId: users[0]._id,
        status: 'approved'
      },
      {
        name: 'Gold Necklace',
        description: '24K Pure Gold',
        price: 2000,
        category: 'jewellery',
        ownerId: users[0]._id,
        status: 'approved'
      }
    ])
    console.log('📦 Items created')

    // Create Auctions
    const now = new Date()
    const auctions = await Auction.insertMany([
      {
        itemId: items[0]._id,
        ownerId: users[0]._id,
        startDate: now,
        endDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        status: 'ongoing',
        initialPrice: 1000,
        currentPrice: 1200
      },
      {
        itemId: items[1]._id,
        ownerId: users[0]._id,
        startDate: now,
        endDate: new Date(now.getTime() + 48 * 60 * 60 * 1000),
        status: 'upcoming',
        initialPrice: 2000,
        currentPrice: 2000
      }
    ])
    console.log('🔨 Auctions created')

    // Create Bids
    const bids = await Bid.insertMany([
      {
        auctionId: auctions[0]._id,
        userId: users[1]._id,
        amount: 1200
      }
    ])
    console.log('💰 Bids created')

    // Create Transactions (for closed auctions)
    const transactions = await Transaction.insertMany([
      {
        sellerId: users[0]._id,
        buyerId: users[1]._id,
        itemId: items[0]._id,
        price: 1200,
        date: new Date()
      }
    ])
    console.log('📜 Transactions created')

    console.log('✅ Seeding completed!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error seeding database', err)
    process.exit(1)
  }
}

seed()
