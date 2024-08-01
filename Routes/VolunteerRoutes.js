const express = require('express');
const volRouter = express.Router();
const Volunteer = require('../Schemas/VolunteerSchema');
const Notification = require('../Schemas/notificationSchema');
const User = require('../Schemas/userSchema');
const jwt = require("jsonwebtoken");
const { validateVlounteer, isLoggedIn } = require('../utils/middlewares');


volRouter.post('/volunteers',isLoggedIn,validateVlounteer, async(req,res)=>{
    const {name,email,token} = req.body;
    const userId = jwt.verify(token,'fortheloveofgodpleasework');
    const user = await User.findById(userId);

    const volunteer = new Volunteer({
        name:name,
        email:email,
        user:user,
    })

    const notification = new Notification({
        user:user,
        type: 'volunteerForm',
        processId: volunteer._id
    })

    await volunteer.save();
    await notification.save();

    res.send({success:true,message:"You volunteer form have been submitted"});
})

module.exports = volRouter;