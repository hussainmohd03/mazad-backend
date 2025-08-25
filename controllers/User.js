const User = require('../models/User')
const middleware = require('../middleware')


const addToWatchList = async(req,res)=>{
    try{
        const addedItem = await User.findByIdAndUpdate(
            req.body.id,
            {$push: {watchList: req.params.auctionId}},
            {new:true}
        )
    }catch(error){
        throw(error)
    }
}

const removeFromWatchList = async(req,res)=>{
    try{
        const removedItem = await User.findByIdAndUpdate(
            req.body.id,
            {$pull: {watchList: req.params.auctionId}},
            {new:true}
        )
    }catch(error){
        throw(error)
    }
}

const getWatchList = async(req,res)=>{
    try{
        const currentUser = await User.findById(req.body.id).populate('watchList')
        res.json(currentUser.watchList)
    }catch(error){
        throw(error)
    }
}

module.exports = {
    addToWatchList,
    removeFromWatchList,
    getWatchList
}