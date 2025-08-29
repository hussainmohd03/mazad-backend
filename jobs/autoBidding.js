const Auction = require('../models/auction')
const Bidding = require('../models/Bidding')
const User = require('../models/User')

const placeAutoBidding = () => {
  // check if time is over 
  // check if im the highest bidder 
  // check if i have enough credit 
  // check if theres been a new bidding 
  // check if maximum bid is reached 

}

// bidding is placed
  // check if auto-bidding is checked
    // if auto-bidding is checked enable websocket 
      // listen for biddings placed on the same auction
        // when another bidding is placed check if amount is greater than maximum bid + increment
          // if amount is less than maximum bid plus increment  
            //  check if remaining balance is greater than maximum bid plus increment  
              // check if time is not over 
                // place bid at past maximum bit plus increment 
                  // repeat