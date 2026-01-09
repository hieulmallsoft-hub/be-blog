// // con thỏ cần 3s mới ăn cỏ và uống nước xong.
// function con_tho_an_co(callback007) {
//   setTimeout(function() {
//     console.log('con thỏ ăn cỏ, uống nước');
//     callback007()
//   }, 3000);
// }

// con thỏ chui vô hang
// function hotel() {
//   console.log('chui vô hotel');
// }


// // tạo biến callback gắn bằng function và gọi nó lại ở function con_tho_an_co thì lúc này nó chính là là callback007
// var callback = function(){
//     console.log("Em đặt chỗ rồi ")
//     hotel()
// }

// con_tho_an_co(callback);


// function wait2(callback){
//   setTimeout(function(){
//     console.log('done wait');
//     callback();
//   }, 2000);
// }

// console.log("start");
// wait2(function(){
//   console.log("end");
// });



// function sumAsync(a, b, cb){
//     setTimeout(function(){
//         const result = a + b
//         cb(result)
//     },3000)
// }


// function print(kq){
//     console.log("Ket qua: "+kq)
// }

// sumAsync(5,7,print)

// function divideAsync(a,b,cb){
//     setTimeout(() =>{
//         if(b === 0){
//             console.log("Cannot divide by 0",null)
//         }
//         const result = a/b
//         cb(null,result)
//     },3000)
// }


// divideAsync(10, 2, (err, result) => {
//   if (err) return console.log("Error:", err);
//   console.log("Result:", result);
// });

// // Test lỗi
// divideAsync(10, 0, (err, result) => {
//   if (err) return console.log("Error:", err);
//   console.log("Result:", result);
// });



