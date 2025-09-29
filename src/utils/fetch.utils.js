import { Pool } from "undici";
import { config } from "dotenv";
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

// export const ollamaPool = new Pool(process.env.OLLAMA_URL,{
// connections:10,
// pipelining:1
// })

// export async function streamOllamaCompletion(prompt){
//     const {body,statusCode} = await ollamaPool.request({
//         path:'/api/generate',
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({prompt,model:'gemma3:4b',max_tokens:10})
//     })

//     if(statusCode !== 200){
//         throw new Error(`Ollam request failed with status code ${statusCode}`)
//     }

//     let partial = "";
//     const decoder = new TextDecoder();
//     let fullResponse = "";
//     let buffer= "";
//     for await(const chunk of body){
//         buffer += decoder.decode(chunk,{stream:true});
//         const lines = buffer.split('\n');
//         buffer = lines.pop();

//         for(const line of lines){
//             if(!line.trim()) continue;
//             const data = JSON.parse(line);
//             if(data.response){
//                 fullResponse += data.response;

//             };
//             // if(data.done){
//             //     console.log('\n Doneeee \n')
//             //     return fullResponse;
//             // };

//         }
//     }

//     console.log('Streaming complete')
// return fullResponse;
// }

import { Writable } from "stream";
import { stream } from "undici";
export const fetchGithubRepos = async () => {
    let repoNames = [];
  const url = "https://api.github.com/users/nodejs/repos";
  const { statusCode } = await stream(
    url,
    {
      method: "GET",
      headers: {
        "User-Agent": "undici-stream-example",
      },
    },
    () => {
      let buffer = "";
      return new Writable({
        write(chunk, encoding, callback) {
          buffer += chunk.toString();

         
          callback();
        },
        final(callback) {
             try {
            const response = JSON.parse(buffer);
           
              
              repoNames =  response.map((res) => res.name)
            
          console.log("The stream processing completed");

          } catch (err) {
            console.log(`Error parsing json ${err}`);
          }
          callback();
        },
      });
    }
  );

  console.log(statusCode);
  return repoNames;
};
