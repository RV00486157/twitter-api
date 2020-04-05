const express = require('express')
const Twitter = require('twitter')
const router = express.Router()
const UserTweet = require('../model/UserTweets')
require('dotenv').config()

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

router.get('/user/:username',(req,res)=>{
    let username=req.params.username;
    let id;
    let userTweets;
    UserTweet.findOne({name:username})
        .then(user=>{
            if(user){
                res.send(user.tweets)
            }else{
                client.get('users/search',  {q: `${username}`, count: 1}, function(error, users, response) {
                    if(users[0]){
                        id=users[0].id
                        if(id){
                            client.get('statuses/user_timeline.json',  {user_id	: `${id}`, count: 10}, function(error, tweets, response) {
                                userTweets=tweets.map((tweet)=>tweet.text)
                                res.send(userTweets) 
                                const obj = new UserTweet({
                                    name: username,
                                    userId: id,
                                    tweets: userTweets
                                })
                                obj.save()
                                    .then(user=>{
                                        console.log(user)
                                    })
                                    .catch(err=>{
                                        console.log(err)
                                    })
                           });
                        }
                    }else{
                        res.send('no such user')
                    }
                });
                            
            }
        })
    
})

module.exports = router