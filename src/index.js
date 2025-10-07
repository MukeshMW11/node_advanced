import http from 'http';
import dotenv from 'dotenv';
import { commonErrors, commonHTTPErrors } from './libraries/constants/constant.js';
import { fetchGithubRepos } from './libraries/utils/fetch.utils.js';
import AppError from './libraries/errorHandler/Apperror.js';
import { getById } from './apps/users/entry-points/controllers/users.controller.js';
dotenv.config();

const hostname=process.env.HOSTNAME;
const port =process.env.PORT;
const server = http.createServer(async (req,res)=>{
    


if(req.method === 'GET'){
    try{

        // const data  =await streamOllamaCompletion('What is recursion in very short no more than 2 lines ??') ;
        // const data  =await fetchGithubRepos();
        const data = getById(1);
        res.writeHead(200,{'Content-Type':'application/json'});
        res.write(JSON.stringify({message:data}));
        res.end();
        // ollamaPool.close();
    }
    catch(err){
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({"message":`Error fetching the data ${err}`}))
        throw new AppError(commonErrors.resourceNotFound,commonHTTPErrors.notFound,err.message,true);
    }

}
else{
    res.writeHead(200,{'Content-Type':'application/json'});
    res.write(JSON.stringify({message:"This is not the get request."}));
    res.end();

}



})


server.listen(port,hostname,()=>{
    console.log(`The server is listening at port ${port}`);
    // console.log(WebAssembly);
})


