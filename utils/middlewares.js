const ExpressError = require('../utils/ExpressError');
const {AdminJoiSchema,PetJoiSchema, UserJoiSchema, VolunteerJoiSchema, AdpFormJoiSchema, OwnerFormJoiSchema, AdoptionJoiSchema, DonationJoiSchema, NotiJoiSchema }= require('../JoiSchema/Schemas');

module.exports.validateAdmin = (req,res,next)=>{

    //destructor error from validate admin
    const { error } = AdminJoiSchema.validate(req.body, { abortEarly: false });

    //if there's error
    //example joi error consist of details object array
    //map details array //get each detail.message and join with ","
    //throw new error with joined msg and status code
    if(error){
        const msg = error.details.map(el=>el.message).join(',')
        res.send({ success: false, message: msg });
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}

module.exports.validatePet=(req,res,next)=>{
    //user rest operator to create a new object without token
    //rest operator combine the other params into an object 
    const { _id, __v, token, ...params } = req.body;

    const { error } = PetJoiSchema.validate(params, { abortEarly: false });

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.send({ success: false, message: msg });
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateUser = (req, res, next) => {

    const {_id,__v,donation,adoption, ...params } = req.body;

    const { error } = UserJoiSchema.validate(params, { abortEarly: false });

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.send({ success: false, message: msg });
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateVlounteer = (req, res, next) => {

    const { token, ...params } = req.body;

    const { error } = VolunteerJoiSchema.validate(params, { abortEarly: false });

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.send({ success: false, message: msg });
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateAdpForm = (req, res, next) => {

    const { token, ...params } = req.body;

    const { error } = AdpFormJoiSchema.validate(params, { abortEarly: false });

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.send({ success: false, message: msg });
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateOwnerForm = (req, res, next) => {

    const { token, ...params } = req.body;

    const { error } = OwnerFormJoiSchema.validate(params, { abortEarly: false });

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.send({ success: false, message: msg });
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateAdoption = (req, res, next) => {

    const { token, ...params } = req.body;

    const { error } = AdoptionJoiSchema.validate(params, { abortEarly: false });

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.send({ success: false, message: msg });
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateDonation = (req, res, next) => {

    const { token, ...params } = req.body;

    const { error } = DonationJoiSchema.validate(params, { abortEarly: false });

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.send({ success: false, message: msg });
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateNoti = (req, res, next) => {

    const { token, ...params } = req.body;

    const { error } = NotiJoiSchema.validate(params, { abortEarly: false });

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.send({ success: false, message: msg });
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    const { token } = req.body;
    if(token){
        next();
    }else{
        res.send({ success: false, message: "Please log in to continue!" });
        throw new ExpressError(msg, 403);
    }
}
