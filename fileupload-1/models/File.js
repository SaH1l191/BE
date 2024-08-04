

const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

require("dotenv").config();

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{  
        type:String,
    },
    tags:{
        type:String,
    },
    emails:{
        type:String,
    },
})


//post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("doc=>",doc);
        //transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //send mail 
        let info = await transporter.sendMail({
            from:`CodeHelp`,
            to: doc.email,
            subject:"new file uploaded on cloudinary",
            html:`<h1>Hello Jee ! </h1><p>File Uploaded</p>`
        })
        console.log("INFO",info);
    }
    catch(error){
        console.error(error);
    }
});


const File = mongoose.model("File",fileSchema);
module.exports = File; 

