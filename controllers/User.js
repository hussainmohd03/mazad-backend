const User = require('../models/user')
import { io } from 'socket.io-client'
const socket = io('http://localhost:5045')
const middleware = require('../middleware')

const updatePassword = async (req, res) => {
  try {
    console.log('enters update password controller from backend')
    const { id } = res.locals.payload
    const { old_password, new_password } = req.body
    let currentUser = await User.findById(id)

    if (!currentUser) {
      return res
        .status(400)
        .send({ status: 'error', msg: 'user does not exist' })
    }

    const matched = await middleware.comparePassword(
      old_password,
      currentUser.passwordHash
    )

    if (matched) {
      console.log('inside matched')
      const passwordHash = await middleware.hashPassword(new_password)
      console.log('hashing new pass')
      currentUser = await User.findByIdAndUpdate(
        id,
        { passwordHash: passwordHash },
        { new: true }
      )

      const payload = {
        id: currentUser._id,
        email: currentUser.email,
        first_name: currentUser.firstName,
        last_name: currentUser.lastName,
        role: currentUser.type
      }
      return res
        .status(200)
        .send({ status: 'password updated successfully', user: payload })
    }
    res.status(401).send({ status: 'error', msg: 'update password failed' })
  } catch (error) {}
}

const updateProfile = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const updatedProfile = await User.findByIdAndUpdate(id, req.body, {
      new: true
    })
    // here socket.emit
    socket.emit('updateAccount', id)
    res
      .status(200)
      .send({ msg: 'profile successfully updated', user: updatedProfile })
  } catch (error) {
    throw error
  }
}

const getMyProfileById = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const profile = await User.findById(id)

    if (!profile) return res.status(404).send({ msg: 'profile not found' })

    res.status(200).send({ msg: 'profile fetched', user: profile })
  } catch (error) {
    throw error
  }
}

const deleteMyProfile = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const deletedProfile = await User.findByIdAndDelete(id)

    if (!deletedProfile)
      return res.status(404).send({ msg: 'profile not found' })

    res.status(200).send({ msg: 'profile deleted successfully' })
  } catch (error) {}
}

const addToWatchList = async (req, res) => {
  try {
    const addedItem = await User.findByIdAndUpdate(
      req.body.id,
      { $push: { watchList: req.params.auctionId } },
      { new: true }
    )
  } catch (error) {
    throw error
  }
}

const removeFromWatchList = async (req, res) => {
  try {
    const removedItem = await User.findByIdAndUpdate(
      req.body.id,
      { $pull: { watchList: req.params.auctionId } },
      { new: true }
    )

    res.status(200).send({ removedItem })
  } catch (error) {
    throw error
  }
}

const getWatchList = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.id).populate('watchList')
    res.status(200).send(currentUser.watchList)
  } catch (error) {
    throw error
  }
}

module.exports = {
  updatePassword,
  updateProfile,
  getMyProfileById,
  deleteMyProfile,
  addToWatchList,
  removeFromWatchList,
  getWatchList
}
