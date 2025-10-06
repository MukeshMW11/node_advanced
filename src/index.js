import http from 'http';
import dotenv from 'dotenv';
import { fetchGithubRepos} from './utils/fetch.utils.js';
dotenv.config();

const hostname=process.env.HOSTNAME;
const port =process.env.PORT;
const server = http.createServer(async (req,res)=>{
    
if(req.method === 'GET'){
    try{

        // const data  =await streamOllamaCompletion('What is recursion in very short no more than 2 lines ??') ;
        const data  =await fetchGithubRepos();
        res.writeHead(200,{'Content-Type':'application/json'});
        res.write(JSON.stringify({message:data}));
        res.end();
        ollamaPool.close();
    }
    catch(err){
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({"message":`Error fetching the data ${err}`}))
        throw new Error('There was ana error getting the request');
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


