import inquirer from 'inquirer'
import { hashPassword } from './middleware/index.js'
import User from './models/User.js'
import mongoose from 'mongoose'

const addAdmin = async () => {
  const answers = await inquirer.prompt([
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
  let passwordDigest = await hashPassword(answers.password)

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
