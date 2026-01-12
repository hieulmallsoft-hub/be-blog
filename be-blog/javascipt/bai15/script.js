// const fullname = localStorage.getItem("fullname");
// console.log(fullname);

// // Hiển thị fullname nếu có
// const test = document.getElementById("test");
// if (fullname) {
//     test.innerHTML = fullname;
// }

// // Change mode
// const mode = localStorage.getItem("mode");
// console.log(mode);

// if (mode === "dark") {
//     const body = document.querySelector("body");
//     body.classList.add("dark");
// }

// const buttonChangeMode = document.querySelector("button");
// if (buttonChangeMode) {
//     buttonChangeMode.addEventListener("click", () => {
//         const body = document.querySelector("body");
//         body.classList.toggle("dark");
//         if (body.classList.contains("dark")) {
//             localStorage.setItem("mode", "dark");
//         } else {
//             localStorage.setItem("mode", "light");
//         }
//     });
// }

// console.log(localStorage);



// spread operator

// const ListUser = [
//     {
//         id: 1,
//         name: "User 1",
//         age: 20
//     },
//     {
//         id: 2,
//         name: "User 2",
//         age: 21
//     },
//     {
//         id: 3,
//         name: "User 3",
//         age: 22
//     }
// ];

// const listUserFe = [
//     "User 1",
//     "User 2",
//     "User 3"
// ]

// listUserDb = [...listUserFe, ...ListUser];
// console.log(listUserDb);



// const time = ["50", "60", "70"];

// const [Hour, Minute, Second] = time;


// console.log(Hour);
// console.log(Minute);
// console.log(Second);




// const inforUser = {
//     name: "User 1",
//     age: 20
// }


// const { name, age } = inforUser;
// console.log(name);
// console.log(age);



