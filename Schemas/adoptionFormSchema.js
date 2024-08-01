const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adpFormSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: "Pet"
    },
    adp_form_name: {
        type: String,
        required: true
    },
    adp_form_email: {
        type: String,
        required: true
    },
    adp_form_address:{
        type:String,
        required:true
    },
    adp_form_phone: {
        type: String,
        required: true
    },  
})

const AdpForm = mongoose.model("AdoptionForm", adpFormSchema);

module.exports = AdpForm;