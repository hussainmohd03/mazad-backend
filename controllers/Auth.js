const User = require('../models/User')
const Item = require('../models/Item')
const middleware = require('../middleware/index')

const { hashPassword, comparePassword, createToken } = require('../middleware')

const Register = async (req, res) => {
  try {
    const { email, password, full_name } = req.body
    const space_index = full_name.indexOf(' ')
    const firstName = full_name.substring(0, space_index)
    const lastName = full_name.substring(space_index, full_name.length)

    let passwordHash = await middleware.hashPassword(password)
    console.log('before')
    let existingUserInDB = await User.findOne({ email })
    console.log(existingUserInDB)

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

// tested and works
const LoginAsAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('email', email)
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
}

const SignUpAdmin = async (req, res) => {
  try {
    const { full_name, email, password } = req.body
    const space_index = full_name.indexOf(' ')
    const firstName = full_name.substring(0, space_index)
    const lastName = full_name.substring(space_index, full_name.length)
    const existing = await User.findOne({ email })
    if (existing) {
      return res
        .status(400)
        .send({ status: 'error', msg: 'email already in use' })
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
    res.status(201).send({
      status: 'success',
      msg: 'admin created successfully',
      user: newAdmin
    })
  } catch {
    res.status(500).send({ status: 'error' })
  }
}

module.exports = {
  Register,
  Login,
  LoginAsAdmin,
  SignUpAdmin
}
