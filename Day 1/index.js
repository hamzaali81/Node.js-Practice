 const fs=require('fs');
const http=require('http')
const url=require('url')
const replaceTemplate=require('./modules/replaceTemplate')
const slugify=require('slugify');


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


//Server
// const replaceTemplate=(temp,product)=>{
//   //trick let output=temp.replace('{%PRODUCTNAME%}',product.productName) 
//   let output=temp.replace(/{%PRODUCTNAME%}/g,product.productName);
//   output=output.replace(/{%IMAGE%}/g,product.image);
//   output=output.replace(/{%PRICE%}/g,product.price);
//   output=output.replace(/{%FROM%}/g,product.from);
//   output=output.replace(/{%NUTRIENTS%}/g,product.nutrients);
//   output=output.replace(/{%QUANTITY%}/g,product.quality);
//   output=output.replace(/{%DESCRIPTION%}/g,product.description);
//   output=output.replace(/{%ID%}/g,product.id);

//   if(!product.organic) output=output.replace(/{%NOT_ORGANIC%}/g , 'not-organic');
//   return output;
// }


const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8')
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8')

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')

  const objdata =JSON.parse(data);
  console.log(slugify('fresh Avocados',{lower:true}))
const server=http.createServer((req,res)=>{
  
  console.log(req.url);
  // console.log(url.parse(req.url,true));
  // const pathName=req.url;
 const {pathname,query}=(url.parse(req.url,true));
 



   //Overview Page
  if(pathname==='/'|| pathname==='/overview'){
   //  res.end("This is overview");
      res.writeHead(200,{'Content-type':'text/html'})
      const cardsHtml=objdata.map(el=>replaceTemplate(tempCard,el)).join(' ');
      const output=tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
     // console.log(cardsHtml)
     res.end(output)
    //  res.end(tempOverview);
     }
  //Product Page
  else if(pathname=== '/product'){
    const product=objdata[query.id]
    res.writeHead(200,{'Content-type':'text/html'})
    const output=replaceTemplate(tempProduct,product)
    //  res.end("This is the product");
    res.end(output);
//     console.log(query);
 }
  //Api Page
  else if(pathname==='/api'){
// fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data) =>{
//   const productData =JSON.parse(data);
  res.writeHead(200,{'Content-type':'application/json'})
  res.end(data)
  // console.log(productData);
// });
// res.end('API');
  }

//Page Not Found 404
  else{
    res.writeHead(404,{
'Content-type': 'text/html',
'my-own-header':'hello world'
    });
    res.end("<h1>Page not found!<h1>")
  }
   
});

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listeining request")
});