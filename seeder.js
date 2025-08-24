import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://mad6717:M123123123m@student-cluster.628xz0y.mongodb.net/mazad'

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ MongoDB connected')

    const db = mongoose.connection

    // Clear old collections
    await db.collection('users').deleteMany({})
    await db.collection('items').deleteMany({})
    await db.collection('auctions').deleteMany({})
    await db.collection('bids').deleteMany({})
    await db.collection('transactions').deleteMany({})
    console.log('🗑️ Old data cleared')

    // Users
    const passwordHash = await bcrypt.hash('password123', 10)
    const users = await db.collection('users').insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        passwordHash,
        type: 'user',
        balance: 5000,
        verified: true
      },
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        passwordHash,
        type: 'admin',
        balance: 10000,
        verified: true
      },
      {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        passwordHash,
        type: 'user',
        balance: 3000,
        verified: false
      }
    ])
    console.log('👤 Users created')

    // Items
    const items = await db.collection('items').insertMany([
      {
        name: 'Luxury Watch',
        description: 'Rolex Submariner',
        price: 1000,
        category: 'watches',
        ownerId: users.insertedIds['0'],
        status: 'approved'
      },
      {
        name: 'Gold Necklace',
        description: '24K Pure Gold',
        price: 2000,
        category: 'jewellery',
        ownerId: users.insertedIds['0'],
        status: 'approved'
      },
      {
        name: 'Vintage Car',
        description: 'Classic 1965 Mustang',
        price: 15000,
        category: 'vehicles',
        ownerId: users.insertedIds['1'],
        status: 'pending'
      },
      {
        name: 'Industrial Drill',
        description: 'Heavy-duty electric drill',
        price: 500,
        category: 'industrial',
        ownerId: users.insertedIds['2'],
        status: 'pending'
      },
      {
        name: 'Antique Painting',
        description: 'Oil painting from 19th century',
        price: 800,
        category: 'art',
        ownerId: users.insertedIds['1'],
        status: 'rejected'
      },
      {
        name: 'Pearl Earrings',
        description: 'Genuine pearls',
        price: 300,
        category: 'pearls',
        ownerId: users.insertedIds['2'],
        status: 'rejected'
      }
    ])
    console.log('📦 Items created')

    // Auctions
    const now = new Date()
    const auctions = await db.collection('auctions').insertMany([
      {
        itemId: items.insertedIds['0'],
        ownerId: users.insertedIds['0'],
        startDate: now,
        endDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        status: 'ongoing',
        initialPrice: 1000,
        currentPrice: 1200
      },
      {
        itemId: items.insertedIds['1'],
        ownerId: users.insertedIds['0'],
        startDate: new Date(now.getTime() + 1 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 25 * 60 * 60 * 1000),
        status: 'upcoming',
        initialPrice: 2000,
        currentPrice: 2000
      },
      {
        itemId: items.insertedIds['2'],
        ownerId: users.insertedIds['1'],
        startDate: new Date(now.getTime() - 48 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        status: 'closed',
        initialPrice: 15000,
        currentPrice: 15000
      }
    ])
    console.log('🔨 Auctions created')

    // Bids
    await db.collection('bids').insertMany([
      {
        auctionId: auctions.insertedIds['0'],
        userId: users.insertedIds['1'],
        amount: 1200
      },
      {
        auctionId: auctions.insertedIds['0'],
        userId: users.insertedIds['2'],
        amount: 1250
      },
      {
        auctionId: auctions.insertedIds['2'],
        userId: users.insertedIds['0'],
        amount: 15500
      }
    ])
    console.log('💰 Bids created')

    // Transactions
    await db.collection('transactions').insertMany([
      {
        sellerId: users.insertedIds['1'],
        buyerId: users.insertedIds['0'],
        itemId: items.insertedIds['2'],
        price: 15000,
        date: new Date(),
        status: 'completed'
      },
      {
        sellerId: users.insertedIds['0'],
        buyerId: users.insertedIds['2'],
        itemId: items.insertedIds['0'],
        price: 1200,
        date: new Date(),
        status: 'pending'
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
