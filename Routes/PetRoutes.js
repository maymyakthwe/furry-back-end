const express = require('express');
const petRouter = express.Router();
const Pet =require('../Schemas/petSchema')
const Admin = require('../Schemas/AdminSchema')
const Notification = require('../Schemas/notificationSchema')
const jwt = require('jsonwebtoken');
const { validatePet, isLoggedIn } = require('../utils/middlewares');



//API for creating pets
petRouter.post('/pets',isLoggedIn,validatePet, async (req, res) => {

    const {token}=req.body;
    const adminId = jwt.verify(token,'fortheloveofgodpleasework')
    const admin = await Admin.findById(adminId);
    
    //get all pets from database
    const allPet = await Pet.find({});
    let id;

    //if there's pets
    if (allPet.length > 0) {
        //get the lastest pet
        //neg index of slice works from the end of the array
        //return last two elements from array
        //take last element
        let last_pet_array = allPet.slice(-1);
        let last_pet = last_pet_array[0];

        id = last_pet.pet_id + 1;
    } else {
        id = 2341;
    }

    //create new pet
    const pet = new Pet({
        pet_id: id,
        pet_name: req.body.pet_name,
        pet_image: req.body.pet_image,
        pet_type: req.body.pet_type,
        pet_age: req.body.pet_age,
        pet_gender: req.body.pet_gender,
        pet_color: req.body.pet_color,
        pet_description: req.body.pet_description,
        pet_arrived_date: req.body.pet_arrived_date,
        pet_medical_check: req.body.pet_medical_check,
        isPlaymate:req.body.isPlaymate,
    });


    //create notification
    const notification = new Notification({
        pet: pet,
        admin: admin,
        type: 'newPet',
        processId:pet.pet_id
    })

    await pet.save();
    await notification.save();

    //respond
    res.json({
        success: true,
        message: `New Pet ${req.body.pet_name} is Added`
    })
})

//API for fetching all pets
petRouter.get('/pets', async (req, res) => {
    let allPets = await Pet.find({});
    console.log("all pets fetched");
    res.send(allPets);
})

//API for getting one pet with id
petRouter.get('/pets/:petId', async (req, res) => {
    let petId = req.params['petId'];
    let pet = await Pet.findOne({ pet_id: petId });
    res.send(pet);
})

petRouter.delete('/pets/:petId/delete',async(req,res)=>{
    let petId = req.params['petId'];
    let pet = await Pet.findOneAndDelete({pet_id:petId});
    res.send({
        success:true,
        message: `Pet ID ${petId} is deleted From the pet list!`,
    })
})

petRouter.put('/pets/:petId/update', isLoggedIn, validatePet,async(req,res)=>{
    let petId = req.params['petId'];
    await Pet.findOneAndUpdate({pet_id:petId},{
        pet_name: req.body.pet_name,
        pet_image: req.body.pet_image,
        pet_type: req.body.pet_type,
        pet_age: req.body.pet_age,
        pet_gender: req.body.pet_gender,
        pet_color: req.body.pet_color,
        pet_description: req.body.pet_description,
        pet_arrived_date: req.body.pet_arrived_date,
        pet_medical_check: req.body.pet_medical_check,
        isAdoptable: req.body.isAdoptable,
        isPlaymate: req.body.isPlaymate,
    })
    res.json({
        success: true,
        message:`Pet Id ${petId} is updated!`
    })
})

module.exports = petRouter;
