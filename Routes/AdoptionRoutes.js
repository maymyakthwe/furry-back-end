const express = require('express');
const adpRouter = express.Router();
const Admin = require('../Schemas/AdminSchema')
const User = require('../Schemas/userSchema')
const Pet=require('../Schemas/petSchema')
const Adoption = require('../Schemas/adoptionSchema')
const Notification = require('../Schemas/notificationSchema')
const jwt = require('jsonwebtoken');
const { validateAdoption, isLoggedIn } = require('../utils/middlewares');

adpRouter.post('/adoptions', isLoggedIn, validateAdoption,async(req,res)=>{
    const {user_email,pet_id,token} = req.body;
    const adminId = jwt.verify(token,'fortheloveofgodpleasework');
    const user = await User.findOne({ user_email:user_email});
    const pet = await Pet.findOne({pet_id});
    const admin = await Admin.findOne({_id:adminId});

    const adoption = new Adoption({
        user:user,
        pet:pet,
        admin:admin,
        adoption_amount:req.body.adp_amount,
        adoption_date:req.body.adp_date,
        adoption_description:req.body.adp_description
    })

    const notification = new Notification({
        user: user,
        pet: pet,
        admin: admin,
        date:Date.now(),
        amount: req.body.adp_amount,
        type:'newAdoption',
        processId:adoption._id
    })

    user.adoption.push(adoption);

    await adoption.save();
    await user.save();
    await notification.save();

    res.send({
        success:true,
        message:"New adoption is added to the list!"
    })

})


adpRouter.get('/adoptions', async (req, res) => {
    const adoption = await Adoption.find({}).populate('user').populate('admin').populate('pet');
    res.send(adoption);
})

adpRouter.delete('/adoptions/:adoptionId/delete', async (req, res) => {
    let adoptionId = req.params['adoptionId'];
    let adoption = await Adoption.findOneAndDelete({ _id: adoptionId });

    //remove adoption from the user.adoption 
    await User.findOneAndUpdate({_id:adoption.user},{$pull:{adoption:adoptionId}})
    res.send({
        success: true,
    })
})

module.exports = adpRouter;