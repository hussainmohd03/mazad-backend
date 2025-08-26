const User = require('../models/User')

const middleware = require('../middleware/index')
const { hashPassword, comparePassword, createToken } = require('../middleware')

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
          role: existingUserInDB.type
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

const loginAsAdmin = async (req, res) => {
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
    const token = createToken({ id: admin._id, type: 'admin' })
    res.status(200).send({ status: 'success', token })
  } catch {
    throw error
  }
} // done dut not tested

const listAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash')
    res.status(200).send({ status: 'success', users })
  } catch {
    res.status(500).send({ status: 'error', msg: error.message })
  }
} // done dut not tested

const addAdminAccount = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
      return res
        .status(400)
        .send({ status: 'error', msg: 'Passwords do not match' })
    }

    const [firstName, lastName] = fullName.split(' ')
    const existing = await User.findOne({ email })
    if (existing) {
      return res
        .status(400)
        .send({ status: 'error', msg: 'Email already in use' })
    }

    const hashedPassword = await hashPassword(password)
    const newAdmin = new User({
      firstName,
      lastName: lastName || '',
      email,
      passwordHash: hashedPassword,
      type: 'admin'
    })

    await newAdmin.save()
    res
      .status(201)
      .send({ status: 'success', msg: 'Admin created successfully' })
  } catch {
    throw error
  }
} // done dut not tested

module.exports = {
  Register,
  Login,
  loginAsAdmin,
  listAllUsers,
  addAdminAccount
}
