const User = require('../models/User')

const middleware = require('../middleware/index')

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

module.exports = {
  Register,
  Login
}
