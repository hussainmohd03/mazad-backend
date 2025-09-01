const User = require('../models/user')
const Item = require('../models/Item')
const middleware = require('../middleware/index')
const { hashPassword, comparePassword, createToken } = require('../middleware')
const Bidding = require('../models/Bidding')
const auction = require('../models/auction')

const Register = async (req, res) => {
  try {
    const { email, password, full_name } = req.body
    const space_index = full_name.indexOf(' ')
    const firstName = full_name.substring(0, space_index)
    const lastName = full_name.substring(space_index, full_name.length)

    let passwordHash = await middleware.hashPassword(password)
    let existingUserInDB = await User.findOne({ email })

    if (existingUserInDB) {
      return res.status(400).send('a user with this email exists. try another.')
    } else {
      const user = await User.create({
        email,
        passwordHash,
        firstName,
        lastName
      })
      return res.send(user)
    }
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUserInDB = await User.findOne({ email })
    if (existingUserInDB) {
      let matched = await middleware.comparePassword(
        password,
        existingUserInDB.passwordHash
      )
      if (matched) {
        let payload = {
          id: existingUserInDB._id,
          email: existingUserInDB.email,
          first_name: existingUserInDB.firstName,
          last_name: existingUserInDB.lastName,
          type: existingUserInDB.type
        }
        let token = middleware.createToken(payload)
        return res.status(200).send({ user: payload, token })
      }
    } else {
      return res.status(400).send('no user exists with that email.')
    }
  } catch (error) {
    throw error
  }
}

const getFinancialInfo = async (req, res) => {
  try {
    const existingUserInDB = await User.findById(res.locals.payload.id)
    let bidding_balance = existingUserInDB.lockedAmount
    const biddings = await Bidding.find({
      userId: existingUserInDB._id
    }).sort({
      createdAt: -1
    })
    biddings.forEach((bidding) => (bidding_balance += bidding.amount))
    const user = await User.findById(existingUserInDB._id)
    const balance = user.balance
    const used = (bidding_balance / balance) * 100
    let remaining = 0
    if (balance > 0) {
      remaining = parseInt(balance) - parseInt(bidding_balance)
    }
    res.status(200).send({
      remaining: remaining,
      bidding_limit: bidding_balance,
      deposit: balance,
      used_percentage: Math.floor(used)
    })
  } catch (error) {
    throw error
  }
}

const LoginAsAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await User.findOne({ email, type: 'admin' })

    if (!admin) {
      return res.status(401).send({ status: 'error', msg: 'Admin not found' })
    }
    const matched = await comparePassword(password, admin.passwordHash)
    if (!matched) {
      return res
        .status(401)
        .send({ status: 'error', msg: 'Invalid credentials' })
    }
    let payload = {
      id: admin._id,
      email: admin.email,
      first_name: admin.firstName,
      last_name: admin.lastName,
      type: admin.type
    }
    const token = await middleware.createToken({ payload })
    res.status(200).send({ status: 'success', token, payload })
  } catch (error) {
    throw error
  }
}

module.exports = {
  Register,
  Login,
  getFinancialInfo,
  LoginAsAdmin
}
