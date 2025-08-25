const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected ╰(*°▽°*)╯ ${mongoose.connection.name}`)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

mongoose.connection.on('connected', () => {
  console.log(`connected to database: ${mongoose.connection.name}`)
})

module.exports = mongoose
