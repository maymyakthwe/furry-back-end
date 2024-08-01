const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notification = require('./notificationSchema')
const Adoption = require('./adoptionSchema')

const petSchema = new Schema({
    pet_id: {
        type: Number,
        required: true,
    },
    pet_name: {
        type: String,
        required: true,
    },
    pet_image: {
        type: String,
        required: true,
    },
    pet_type: {
        type: String,
        enum:['dog','cat','rabbit','others'],
        required: true,
        default:'dog',
    },
    pet_age: {
        type: Number,
        required: true,
    },
    pet_gender: {
        type: String,
        enum:['male','female'],
        required: true,
        default:'male',
    },
    pet_color: {
        type: String,
        enum:['white','black','orange','grey'],
        required: true,
        default:'grey',
    },
    pet_description: {
        type: String,
        required: true,
    },
    pet_arrived_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    pet_medical_check: {
        type: Boolean,
        default: true,
        required: true,
    },
    isAdoptable:{
        type:Boolean,
        default:null,
    },
    isPlaymate:{
        type: Boolean,
        default: null,
    }
})

petSchema.post('findOneAndDelete',async function(p){

    //delete new pet noti associated with 'p'
    let noti = Notification.findOne({processId:p.pet_id})
    if(noti){
        await Notification.deleteOne({ processId: p.pet_id });
    }

    //delete adoption associated with 'p'
    let adoption = await Adoption.find({ pet: p })
    if(adoption.length){
        await Adoption.deleteMany({ pet: p });
    }

    //delete adoption noti associated with 'p'
    adoption.map(async(a)=>{
        let n = await Notification.find({ processId: a._id })
        if(n){
            await Notification.findOneAndDelete({ processId: a._id })
        }
    })
})

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;