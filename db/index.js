require('dotenv').config()
const mongoose = require('mongoose');

const connectionDB = ()=>{
    mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Database connection established')
}).catch((error)=>{
    console.log(error.message);
})
}


module.exports = connectionDB;