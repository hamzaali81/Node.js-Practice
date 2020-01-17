const fs=require('fs');
setTimeout(() => {
    console.log("Hello world");
}, 10);
setImmediate(()=>{
    console.log("Hello world 2")
})
fs.readFile('test-file.txt','utf-8',()=>{
    console.log("Hello world 3");
    console.log('-----------------------------------------------------')
    setTimeout(() => {console.log("Hello world 5");}, 10);
    setImmediate(() => {console.log("Hello world 8");}, 4);
    process.nextTick(()=>{
        console.log("process.nextTick")
    })
})
console.log("Hello world 4");