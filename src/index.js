import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const hostname=process.env.HOSTNAME;
const port =process.env.PORT;
const server = http.createServer((req,res)=>{
    
if(req.method === 'GET'){
    res.writeHead(200,{'Content-Type':'application/json'});
    res.write(JSON.stringify({message:"This is the get request."}));
    res.end();

}
else{
    res.writeHead(200,{'Content-Type':'application/json'});
    res.write(JSON.stringify({message:"This is not the get request."}));
    res.end();

}



})


server.listen(port,hostname,()=>{
    console.log(`The server is listening at port ${port}`);
    console.log(WebAssembly);
})