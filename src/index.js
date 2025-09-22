import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const hostname=process.env.HOSTNAME;
const port =process.env.PORT;
const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'application/json'});
    res.write(JSON.stringify({message:"Server successfully created"}));
    res.end();
})


server.listen(port,hostname,()=>{
    console.log(`The server is listening at port ${port}`);
})