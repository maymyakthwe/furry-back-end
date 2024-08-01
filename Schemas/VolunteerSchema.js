const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;