const express = require('express');
const userRouter = express.Router();
const User = require('../Schemas/userSchema');
const jwt = require("jsonwebtoken");
const { validateUser ,isLoggedIn} = require('../utils/middlewares');


//API for fetching one user
userRouter.get('/user/:userId', async (req, res) => {
    let userId = jwt.verify(req.params['userId'], 'fortheloveofgodpleasework');
    let user = await User.findOne({ _id: userId }).populate({
        path: 'adoption',
        populate: {
            path: 'pet',
            model: 'Pet',
        }
    }).populate('donation')
    //populating multiple levels(adp,pet)/multiple fields(adp,don)
    res.send(user);
})

//API for creating users
userRouter.post('/user/signup',validateUser, async (req, res) => {
    let check = await User.findOne({ user_email: req.body.user_email });
    if (check) {
        return res.status(400).json({ success: false, message: "existing user found" });
    } else {
        const user = new User({
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
        });

        //add User
        await user.save();

        const token = jwt.sign(user.id, 'fortheloveofgodpleasework')
        res.json({
            success: true,
            token: token,
            message: "New user created!",
        })
    }
})

//API for fetching all users
userRouter.post('/user/login', async (req, res) => {
    const user = await User.findOne({ user_email: req.body.user_email });
    if (user) {
        const passCompare = req.body.user_password === user.user_password;
        if (passCompare) {
            const token = jwt.sign(user.id, 'fortheloveofgodpleasework');
            res.json({
                success: true,
                token: token,
                message:"Successfully Logged in"
            })
        } else {
            res.json({ success: false, message: "username or password wrong" });
        }
    } else {
        res.json({ success: false, message: "User Doesn't Exist" });
    }
})

//API for updating Users
userRouter.put('/user/:userId/update', isLoggedIn, validateUser, async (req, res) => {
    let userId = jwt.verify(req.params['userId'], 'fortheloveofgodpleasework');
    await User.findOneAndUpdate({ _id: userId }, {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        user_address: req.body.user_address,
        user_avatar: req.body.user_avatar,
    })
    res.json({
        success: true,
        message:"User informations are updated!"
    })
})

module.exports = userRouter

