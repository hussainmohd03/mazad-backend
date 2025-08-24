const User = require('../models/User')
const middleware = require('../middlewares')

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
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  Register
}
