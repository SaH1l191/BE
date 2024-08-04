
const cloudinary = require("cloudinary").v2;


// server data to media server then deletes data from server 
exports.cloudinaryConnect=()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        });
    }
    catch(error){
        console.log(error);
    }
}