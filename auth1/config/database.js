
const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("DB connected !")
    })
    .catch((error)=>{
        console.log(error);
        console.log("Db Issues !")
        process.exit(1);
    }) 
}
