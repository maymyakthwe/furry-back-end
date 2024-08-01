const express = require('express');
const adpFormRouter = express.Router();
const AdpForm = require('../Schemas/adoptionFormSchema')
const Notification = require('../Schemas/notificationSchema');
const jwt = require("jsonwebtoken");
const User = require('../Schemas/userSchema');
const Pet = require('../Schemas/petSchema');
const { validateAdpForm, isLoggedIn } = require('../utils/middlewares');



//API for creating adoption form
adpFormRouter.post('/adoptionForm', isLoggedIn, validateAdpForm, async (req, res) => {

    const id = jwt.verify(req.body.token, 'fortheloveofgodpleasework')
    const user = await User.findOne({ _id: id })
    const pet = await Pet.findOne({ pet_id: req.body.pet_id })

    const adoptionForm = new AdpForm({
        user: user,
        pet: pet,
        adp_form_name: req.body.adp_form_name,
        adp_form_email: req.body.adp_form_email,
        adp_form_address: req.body.adp_form_address,
        adp_form_phone: req.body.adp_form_phone,
    })

    const notification = new Notification({
        user: user,
        pet: pet,
        type: 'adpForm',
        processId: adoptionForm._id
    })

    await adoptionForm.save();
    await notification.save();
    
    res.json({
        success: true,
        message:"Your form is submitted! Admins will contact you within 48 hours!"
    })
})

module.exports = adpFormRouter
