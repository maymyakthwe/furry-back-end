//create a new class called ExpressError
//extends from Error class
//2 properties
//message and statusCode
class ExpressError extends Error{
    constructor(message,statusCode){
        super();
        this.message=message;
        this.statusCode=statusCode;
    }

}

module.exports = ExpressError;