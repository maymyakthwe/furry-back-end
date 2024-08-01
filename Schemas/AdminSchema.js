const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    admin_name: {
        type: String,
        required: true,
    },
    admin_email: {
        type: String,
        required: true,
    },
    admin_password: {
        type: String,
        required: true,
    },
    admin_register_date: {
        type: Date,
        default: Date.now,
    },
})

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;


