import { Pool } from "undici";
import {config} from 'dotenv';
config();
// const pool  =  new Pool('https://jsonplaceholder.typicode.com',{
//     connections:5,
//     pipelining:1
// })

// export const fetchData = async (i) =>{
//     const response  = await pool.request({
//         path:`/posts/${i}`,
//         method:'GET'
//     })
//     const data = await response.body.json();
//     // console.log(data);
//     return data;
// }




// export async function  runDemo(){
//     let result = [];
// for(let i=1;i<=10;i++){
//     result.push( fetchData(i));
//     console.log(`${i} request done`);
// //     setTimeout(()=>{
// // console.log('Time out')
// //     },3000)
// }
// const data = await Promise.all(result);
// console.log('All request done');
// console.log('The result is ',result);
// await pool.close();
// return data;
// }


export const ollamaPool = new Pool(process.env.OLLAMA_URL,{
connections:10,
pipelining:1
})


export async function streamOllamaCompletion(prompt){
    const {body,statusCode} = await ollamaPool.request({
        path:'/api/generate',
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({prompt,model:'gemma3:4b',max_tokens:10})
    }) 


    if(statusCode !== 200){
        throw new Error(`Ollam request failed with status code ${statusCode}`)
    }


    let partial = "";
    const decoder = new TextDecoder();
    for await(const chunk of body){
        partial += decoder.decode(chunk,{stream:true});
console.log(partial);
    }

    console.log('Streaming complete')
return partial;
}