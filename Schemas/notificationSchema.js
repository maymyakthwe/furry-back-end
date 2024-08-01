const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const notiSchema = new Schema({
    date:{
        type: Date,
        default: Date.now,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    pet:{
        type:Schema.Types.ObjectId,
        ref:"Pet"
    },
    amount:{
        type:Number,
        default:0
    },
    type:{
        type:String,
        enum:['adpForm','playmateForm','volunteerForm','newAdoption','newDonation','newPet','ownerForm'],
        required:true
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref:"Admin"
    },
    processId:{
        type:String,
        default:''
    }
})

const Notification = mongoose.model("Notification",notiSchema);

module.exports = Notification;