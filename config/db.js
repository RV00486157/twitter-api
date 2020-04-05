const mongoose = require('mongoose')

const setUpDB = ()=>{
    //DB configuration
    mongoose.connect('mongodb://localhost:27017/twitter-api',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
        .then(()=>{
            console.log('connected to DB')
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports=setUpDB