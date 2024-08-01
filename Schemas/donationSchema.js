const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notification = require('./notificationSchema')

const donationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    donation_amount: {
        type: Number,
        default: 0,
        required: true
    },
    donation_date: {
        type: Date,
        required: true
    },
    donation_description: {
        type: String,
        default: "",
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
})

donationSchema.post('findOneAndDelete', async (a) => {
    let noti = await Notification.findOne({ processId: a._id })
    if (noti) {
        await Notification.deleteOne({ processId: a._id });
    }
})

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;