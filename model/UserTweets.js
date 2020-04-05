const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userTweetSchema=new Schema({
    name:{
        type: String,
        required: true
    },
    userId:{
        type:Number,
        required: true
    },
    tweets:{
        type: Array
    }
})

const UserTweet=mongoose.model('UserTweet',userTweetSchema)

module.exports = UserTweet 