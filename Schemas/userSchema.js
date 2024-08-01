const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name:{
        type:String,
        required:true,
    },
    user_email:{
        type:String,
        required:true,
    },
    user_password:{
        type:String,
        required:true,
    },
    user_avatar:{
        type:String,
        default:"",
    },
    user_phone:{
        type:String,
        default:"",
    },
    user_address:{
        type:String,
        default:"",
    },
    user_register_date:{
        type:Date,
        default:Date.now,
    },
    adoption: [
        {
            type: Schema.Types.ObjectId,
            ref: "Adoption"
        }
    ],
    donation: [
        {
            type: Schema.Types.ObjectId,
            ref: "Donation"
        }
    ]
})

const User = mongoose.model("User",userSchema);

module.exports = User;