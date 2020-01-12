 const fs=require('fs');
const http=require('http')
const url=require('url')
// const textIn=fs.readFileSync('./hello.txt','utf-8');
// console.log(textIn);

// textOut=`Internet grow day by day ${textIn} because just in pakistan`;
// fs.writeFileSync('./world.txt',textOut);
// console.log("Pakistan world")

// //Non blocking code
// fs.readFile('hello.txtttttt','utf-8',(err,data1)=>{
//     if(err) console.log("ERROR")
//     // console.log(data1)
// fs.readFile('input.txt','utf-8',(err,data2)=>{
//     console.log(data2);
// fs.readFile('output.txt','utf-8',(err,data3)=>{
//     console.log(data3);
//     fs.writeFile('final.txt','utf-8',err=>{

// })
// })
// })
// });
/////////////////////////////////

const server=http.createServer((req,res)=>{
  // console.log(req.url)
  const pathName=req.url;
  if(pathName==='/'|| pathName==='/overview'){
    res.end("This is overview");

  }
  else if(pathName==='/product'){

    res.end("This is the product");

  }
  else if(pathName==='/api'){
fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data) =>{
  const productData =JSON.parse(data);
  console.log(productData);
});
res.end('API');
  }


  else{
    res.writeHead(404,{
'content-type': 'text/html',
'my-own-header':'hello world'
    });
    res.end("<h1>Page not found!<h1>")
  }
   
});

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listeining request")



});
