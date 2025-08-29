const middleware = require('./middleware')
const User = require('./models/user')
const mongoose = require('mongoose')

const addAdmin = async () => {
  const inquirer = await import('inquirer')
  const answers = await inquirer.default.prompt([
    {
      type: 'input',
      name: 'full_name',
      message: 'Enter admin full name:'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email (required):'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password (required):'
    }
  ])
  let passwordDigest = await middleware.hashPassword(answers.password)

  const space_index = answers.full_name.indexOf(' ')
  const firstName = answers.full_name.substring(0, space_index)
  const lastName = answers.full_name.substring(
    space_index,
    answers.full_name.length
  )

  mongoose.connect(process.env.MONGO_URI)

  mongoose.connection.on('connected', () => {
    console.log(`connected to database ${mongoose.connection.name}`)
  })

  await User.create({
    email: answers.email,
    passwordHash: passwordDigest,
    firstName,
    lastName,
    type: 'admin'
  })
  mongoose.connection.close()
}

addAdmin()
