const User = require('../models/User')
const Item = require('../models/Item')
const middleware = require('../middleware')

const createItem = async (req ,res) =>{
    try{
        const createdItem = await Item.create(req.body)
    } catch (error){
        throw(error)
    } 
}

const getItemDetails = async(req,res)=>{
    try{
        const itemDetails = await Item.findById(req.params.id)
        res.json(itemDetails)
    }catch(error){
        throw(error)
    }
}

module.exports = {
    createItem,
    getItemDetails
}