const express = require('express');
const ownerFormRouter = express.Router();
const OwnerForm = require('../Schemas/ownerFormSchema')
const Notification = require('../Schemas/notificationSchema');
const jwt = require("jsonwebtoken");
const User = require('../Schemas/userSchema');
const Pet = require('../Schemas/petSchema');
const { validateOwnerForm, isLoggedIn } = require('../utils/middlewares');



//API for creating adoption form
ownerFormRouter.post('/ownerForm', isLoggedIn, validateOwnerForm, async (req, res) => {

    const id = jwt.verify(req.body.token, 'fortheloveofgodpleasework')
    const user = await User.findOne({ _id: id })
    const pet = await Pet.findOne({ pet_id: req.body.pet_id })

    const ownerForm = new OwnerForm({
        user: user,
        pet: pet,
        owner_form_name: req.body.owner_form_name,
        owner_form_email: req.body.owner_form_email,
        owner_form_address: req.body.owner_form_address,
        owner_form_phone: req.body.owner_form_phone,
    })

    const notification = new Notification({
        user: user,
        pet: pet,
        type: 'ownerForm',
        processId: ownerForm._id
    })

    await ownerForm.save();
    await notification.save();

    res.json({
        success: true,
        message: "Your form is submitted! Admins will contact you within 48 hours!"
    })
})

module.exports = ownerFormRouter
