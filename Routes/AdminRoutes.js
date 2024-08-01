const express = require('express');
const adminRouter = express.Router();
const Admin = require('../Schemas/AdminSchema');
const jwt = require('jsonwebtoken');
const {validateAdmin} = require('../utils/middlewares.js')

adminRouter.post('/admin/signup',validateAdmin,async(req,res)=>{

    //finding existing admin account
    const check = await Admin.findOne({ admin_email: req.body.admin_email });
    if (check) {
        return res.status(400).json({ success: false, message: "existing user found" });
    } else {
        const admin = new Admin(req.body);
        await admin.save();

        const token = jwt.sign(admin.id, 'fortheloveofgodpleasework')
        res.json({
            success: true,
            message: "New Admin Added",
            token: token
        })
    }
})

adminRouter.post('/admin/login',async(req,res)=>{
    const admin = await Admin.findOne({admin_email:req.body.admin_email});

    if(admin){
        const passCompare = req.body.admin_password=== admin.admin_password;
        if(passCompare){
            const token = jwt.sign(admin.id,'fortheloveofgodpleasework');
            res.send({
                success:true,
                token:token,
                message: "You have successfully logged in!",
            })
        }else{
            res.send({
                success:false,
                message:"Wrong Username or Password"
            })
        }
    }else{
        res.send({
            success:false,
            message:"Admin does not exist"
        })
    }
})

adminRouter.get('/admin/:adminId',async(req,res)=>{
    const {adminId} = req.params;
    const id = jwt.verify(adminId,"fortheloveofgodpleasework")
    const admin = await Admin.findOne({_id:id})
    
    res.send(admin);
})

module.exports = adminRouter