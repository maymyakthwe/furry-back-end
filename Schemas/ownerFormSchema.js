const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerFormSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: "Pet"
    },
    owner_form_name: {
        type: String,
        required: true
    },
    owner_form_email: {
        type: String,
        required: true
    },
    owner_form_address: {
        type: String,
        required: true
    },
    owner_form_phone: {
        type: String,
        required: true
    },
})

const OwnerForm = mongoose.model("OwnerForm", ownerFormSchema);

module.exports = OwnerForm;