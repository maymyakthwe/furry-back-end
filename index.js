const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const petRouter = require('./Routes/PetRoutes');
const userRouter = require('./Routes/UserRoutes');
const adpFormRouter = require('./Routes/AdpFormRoutes');
const adminRouter = require('./Routes/AdminRoutes');
const adpRouter = require('./Routes/AdoptionRoutes');
const donationRouter = require('./Routes/DonationRoutes');
const notiRouter = require('./Routes/NotificationRoutes');
const volRouter = require('./Routes/VolunteerRoutes');
const ownerFormRouter = require("./Routes/OwnerRoutes");



//use express
app.use(express.json());
app.use(cors(
    {
        origin:["https://"],
        methods:["POST","GET","PUT","DELETE"],
        credentials:true
    }
));

//database connect with mongoose
mongoose.connect("mongodb+srv://thirimyat68:7UIuDawLUvXinFQB@cluster1.7jcqnz7.mongodb.net/furry");


// ***************image handling part******************

//Image Storage using multer
//settings for multer middleware
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

//prepare multer upload middleware
const upload = multer({storage:storage});

//serve images as static route
//first arg is route which is "/images"
//second arg is the file to serve which is "upload/images"
app.use("/images",express.static('upload/images'));

//API to upload pet image
app.post("/upload",upload.single('pet'),(req,res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
});

//API to upload user avatar
app.post("/avatar", upload.single('avatar'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
});

// ************* ROUTES*************

//API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running!!!");
})

//Routes
app.use("/", petRouter);
app.use("/", userRouter);
app.use("/", adpFormRouter);
app.use("/", adminRouter);
app.use("/", adpRouter);
app.use("/", donationRouter);
app.use("/", notiRouter);
app.use("/", volRouter);
app.use("/", ownerFormRouter);

//app.listen
app.listen(port,(error)=>{
    if(!error){
        console.log("Server is Running on Port "+port);
    }else{
        console.log(error);
    }
})