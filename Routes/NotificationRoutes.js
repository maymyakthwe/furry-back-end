const express = require('express');
const notiRouter = express.Router();
const Notification = require('../Schemas/notificationSchema');
const Pet = require('../Schemas/petSchema');
const User = require('../Schemas/userSchema');
const jwt = require('jsonwebtoken');
const { validateNoti, isLoggedIn } = require('../utils/middlewares');


notiRouter.post('/notifications', isLoggedIn, validateNoti, async(req,res)=>{
    const {pet_id,token} = req.body;
    const userId = jwt.verify(token,'fortheloveofgodpleasework')

    const pet = await Pet.findOne({pet_id:pet_id});
    const user = await User.findOne({_id:userId});

    const notification = new Notification({
        user: user,
        pet: pet,
        date: Date.now(),
        type: "playmateForm",
        processId:user._id
    })

    await notification.save();
    
    res.send({
        success:1,
        message:"Successfully submitted!!!"
    })

})


notiRouter.get('/notifications',async(req,res)=>{
    const Notifications = await Notification.find({}).populate('user').populate('admin').populate('pet');
    res.send(Notifications)
})

notiRouter.delete('/noti/:notiId/delete', async (req, res) => {
    let notiId = req.params['notiId'];
    await Notification.findOneAndDelete({ _id: notiId });
    console.log('noti deleted')
})

module.exports = notiRouter;