const User = require('../models/User')
const middleware = require('../middleware')

//not done (gone cleep)
const addToWatchList = async(req,res)=>{
    try{
        const addedItem = await User.findByIdAndUpdate(req.body.id)
    }catch(error){
        throw(error)
    }
}

module.exports = {
    addToWatchList
}