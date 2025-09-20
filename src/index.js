import http from 'http';


const hostname= '127.0.0.1';
const port =3000;
const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'application/json'});
    res.write(JSON.stringify({message:"Server successfully created"}));
    res.end();
})


server.listen(port,hostname,()=>{
    console.log(`The server is listening at port ${port}`);
})