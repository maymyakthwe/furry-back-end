const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notification = require('./notificationSchema');
const { required } = require("joi");

//ADD pet name
const adoptionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: "Pet",
        required: true
    },
    adoption_amount: {
        type: Number,
        default:0
    },
    adoption_date: {
        type: Date,
        required: true
    },
    adoption_description: {
        type: String,
        default: ""
    }, 
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
})

adoptionSchema.post('findOneAndDelete',async(a)=>{
    let noti = await Notification.findOne({ processId: a._id })
    if (noti) {
        await Notification.deleteOne({ processId: a._id });
    }
})


const Adoption = mongoose.model("Adoption", adoptionSchema);

module.exports = Adoption;