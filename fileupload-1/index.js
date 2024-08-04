
const express = require("express");
const app = express();


require("dotenv").config();
const PORT = process.env.PORT || 3000;



//uploads on server
const fileUpload = require("express-fileupload");

//mounting 
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


app.use(express.json());



const db = require("./config/database");
const cloudinary = require("./config/cloudinary");
db.connect();
cloudinary.cloudinaryConnect();

//mouting routes 
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

//Port 
app.listen(PORT,()=>{
    console.log(`APP running successfully on ${PORT}`);
})