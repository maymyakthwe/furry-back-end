const Joi = require("joi");

module.exports.AdminJoiSchema = Joi.object({
    admin_name: Joi.string().required(),
    admin_email: Joi.string().email().required(),
    admin_password: Joi.string().min(3).required(),
    admin_register_date: Joi.date().default(Date.now()),
})

module.exports.PetJoiSchema = Joi.object({
    pet_id: Joi.number(),
    pet_name: Joi.string().required(),
    pet_image: Joi.string().required(),
    pet_type: Joi.string().valid('dog', 'cat', 'rabbit', 'others').required(),
    pet_age: Joi.number().required(),
    pet_gender: Joi.string().valid('male', 'female').required(),
    pet_color: Joi.string().valid('white', 'black', 'orange', 'grey').required(),
    pet_description: Joi.string().required(),
    pet_arrived_date: Joi.date().required(),
    pet_medical_check:Joi.boolean().required(),
    isAdoptable:Joi.boolean().default(false),
    isPlaymate:Joi.boolean().default(false),
})

module.exports.UserJoiSchema = Joi.object({
    user_name: Joi.string().required(),
    user_email: Joi.string().email().required(),
    user_password: Joi.string().min(3).required(),
    user_avatar: Joi.string(),
    user_phone: Joi.string(),
    user_address: Joi.string(),
    user_register_date: Joi.date().default(Date.now()),
})

module.exports.VolunteerJoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
})

module.exports.AdpFormJoiSchema = Joi.object({
    pet_id: Joi.string().required(),
    adp_form_name: Joi.string().required(),
    adp_form_email: Joi.string().email().required(),
    adp_form_address: Joi.string().required(),
    adp_form_phone: Joi.string().required(),
})

module.exports.OwnerFormJoiSchema = Joi.object({
    pet_id: Joi.string().required(),
    owner_form_name: Joi.string().required(),
    owner_form_email: Joi.string().email().required(),
    owner_form_address: Joi.string().required(),
    owner_form_phone: Joi.string().required(),
})

module.exports.AdoptionJoiSchema = Joi.object({
    pet_id: Joi.string().required(),
    user_email: Joi.string().email().required(),
    adoption_amount: Joi.number(),
    adoption_date: Joi.date().required(),
    adoption_description: Joi.string(),
})

module.exports.DonationJoiSchema = Joi.object({
    user_email: Joi.string().email().required(),
    donation_amount: Joi.number().required(),
    donation_date: Joi.date().required(),
    donation_description: Joi.string(),
})

module.exports.DonationJoiSchema = Joi.object({
    user_email: Joi.string().email().required(),
    donation_amount: Joi.number().required(),
    donation_date: Joi.date().required(),
    donation_description: Joi.string(),
})

module.exports.NotiJoiSchema = Joi.object({
    pet_id: Joi.number().required(),
})
