
// function sumAsync(a,b){
//     return new Promise((resolve, reject) =>{
//         setTimeout(()=>{
//             resolve(a+b)
//         },2000)
//     })
// }

// sumAsync(5,7)
// .then((kq)=>console.log("kq: ",kq))
// .catch(err => console.log("err:",err))


// function divideAsync(a,b){
//     return new Promise ((resolve, reject) =>{
//         setTimeout(() => {
//             if(b===0){
//                 return reject("Cannot divide by 0")
//             }
//             resolve(a/b)
//         },500)   
//     })
// }

// divideAsync(2,0)
// .then(ketqua => console.log("kq: ",ketqua)) 
// .catch(err=> console.log(err))


// function wait(ms){
//     return new Promise((resolve, reject)=>{
//         setTimeout(() =>{
//             reject("error")
//         },ms)
//         resolve("Done")
//     })
// }.0

// wait(3000)
// .then(time => console.log(time))



// function sum(a,b){
//     return new Promise((resolve, reject) =>{
//         setTimeout(() =>{
//             resolve(a+b)
//         },3000)
//     })

// }

// sum(5,5).then(tong => console.log("tong: ",tong))



// function divideAsync(a,b){
//     return new Promise((resolve, reject)=>{
//         setTimeout(() =>{
//             if(b == 0){
//               return  reject("Cannot divide by 0")
//             }
//              resolve(a/b)
//         },2000)
       
//     })

// }

// divideAsync(10,0)
// .then(kq => console.log("Ketqua: ",kq))
// .catch(err => console.log(err))

