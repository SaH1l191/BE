
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


exports.localFileUpload = async(req,res)=>{
    try{
        //fetch
        const file = req.files.file;
        console.log(file);

        //server ka path 

        // __dir gives current path directory(components)
        let path = __dirname +"/files"+Date.now()+
        `.${file.name.split('.')[1]}`;
        console.log("Path->",path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local file uploaded successfully",
        });
    }
    catch(error){
        console.log(error);
    }
}


function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
   return await cloudinary.uploader.upload(file.tempFilePath,options);

}

exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType);

        // Checking if the file type is supported by supported types
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // File format supported
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        // db save entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            message: "Image Uploaded Successfully",
            imageUrl: response.secure_url // Corrected imageUrl
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
      

        const file = req.files.videoFile;
        console.log("File Information:", file);

        // Validation for video file types
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split(".")[1].toLowerCase();


        // Checking if the file type is supported by supported types
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        const response = await uploadFileToCloudinary(file, "Codehelp");


        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video Uploaded Successfully",
            
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


exports.imageSizeReducer = async(req,res)=>{
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType);

        // Checking if the file type is supported by supported types
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // File format supported
        const response = await uploadFileToCloudinary(file, "Codehelp",30);
        console.log(response);

        // db save entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            message: "Image Uploaded Successfully",
            imageUrl: response.secure_url // Corrected imageUrl
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
}