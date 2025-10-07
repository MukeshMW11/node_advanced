import { commonErrors, commonHTTPErrors } from "../../../../libraries/constants/constant.js";
import AppError from "../../../../libraries/errorHandler/Apperror.js";
import { createLogger } from "../../../../libraries/logger/src/logger.js";

const logger = createLogger("users");


export const getById = (id) =>{
    try{
        const userObj = {
            id:id,
            name:'Abc',
            age:18,
            profession:'Analyst'

        }
        logger.info(`The user with id ${id} is fetched successfully `)
        console.log(`The ${id} name is Ballot`);
        return userObj;
    }

    catch(err){
        logger.error('User was not found with the given Id');
        throw new AppError(commonErrors.resourceNotFound,commonHTTPErrors.notFound,'user with given id not found');
        
    }
}