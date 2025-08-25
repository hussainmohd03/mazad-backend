const User = require('../models/User')
const middleware = require('../middleware')


const addToWatchList = async(req,res)=>{
    try{
        console.log("reached")
        const addedItem = await User.findByIdAndUpdate(
            req.body.id,
            {$push: {watchList: req.params.auctionId}},
            {new:true}
        )
    }catch(error){
        throw(error)
    }
}

module.exports = {
    addToWatchList
}