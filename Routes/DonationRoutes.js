const express = require('express');
const donationRouter = express.Router();
const Donation = require('../Schemas/donationSchema')
const Admin = require('../Schemas/AdminSchema')
const User = require('../Schemas/userSchema')
const Notification = require('../Schemas/notificationSchema')
const jwt = require('jsonwebtoken');
const { validateDonation, isLoggedIn } = require('../utils/middlewares');

donationRouter.post('/donations', isLoggedIn, validateDonation, async (req, res) => {
    const { user_email, token } = req.body;
    const adminId = jwt.verify(token, 'fortheloveofgodpleasework');
    const user = await User.findOne({ user_email: user_email });
    const admin = await Admin.findOne({ _id: adminId });

    const donation = new Donation({
        user: user,
        admin: admin,
        donation_amount: req.body.donation_amount,
        donation_date: req.body.donation_date,
        donation_description: req.body.donation_description,
    })

    const notification = new Notification({
        user: user,
        admin: admin,
        date: Date.now(),
        amount: req.body.donate_amount,
        type: 'newDonation',
        processId:donation._id
    })

    user.donation.push(donation);

    await donation.save();
    await user.save();
    await notification.save();

    res.send({
        success: true,
        message:"New donation is added to the list!"
    })

})



donationRouter.get('/donations',async(req,res)=>{
    const donation = await Donation.find({}).populate('user').populate('admin');
    res.send(donation);
})

donationRouter.delete('/donations/:donationsId/delete', async (req, res) => {
    let donationId = req.params['donationsId'];
    let donation = await Donation.findOneAndDelete({ _id: donationId });

    //remove donation from the user.donation 
    await User.findOneAndUpdate({ _id: donation.user }, { $pull: { donation: donationId }})
    res.send({
        success: true,
    })
})

module.exports = donationRouter;