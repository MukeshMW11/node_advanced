// function AppError(name,httpCode,description,isOperational){
// Error.call(this);
// Error.captureStackTrace(this);
// this.name = name;
// this.httpCode = httpCode;
// this.description = description;
// this.isOperational = isOperational;

// }

// AppError.prototype = Object.create(Error.prototype);
// AppError.prototype.constructor = AppError;


// export default AppError;



class AppError extends Error{
    constructor(name,httpCode,description,isOperational=true){
        super(description);
        if(Error.captureStackTrace){
            Error.captureStackTrace(this,this.constructor);
        }

        this.name = name;
        this.httpCode = httpCode;
        this.description = description;
        this.isOperational = isOperational;
    }
}


export default AppError;