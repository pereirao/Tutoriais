// //-- Old way
// const getTodos = (resource) => {
//     return new Promise((resolve, reject) => {
//         //const url = "https://jsonplaceholder.typicode.com/todos/";
//         // const url = "todos/adam.json";
//         const url = resource;
//         const req = new XMLHttpRequest();
//         req.addEventListener("readystatechange", () => {
//             if (req.readyState === 4) {
//                 if (req.status === 200) {
//                     resolve(JSON.parse(req.responseText));
//                 }
//                 else {
//                     reject(req.statusText);
//                 }
//             }
//         });
//         req.open("GET", url);
//         req.send();
//     });
// }


// const todoCB = (error, data) => {
//     if (!error) {
//         console.log(data);
//     }
//     else {
//         console.error(error);
//     }
// };

// getTodos("todos/adam.json")
//     .then(data => {
//         todoCB(undefined, data);
//         return getTodos("todos/bob.json");
//     })
//     .then(data => {
//         todoCB(undefined, data);
//         return getTodos("todos/chris.json");
//     })
//     .then(data => {
//         todoCB(undefined, data);
//     })
//     .catch(error => todoCB(error, undefined));

//-- New way

let url = "todos/adam.json";

fetch(url).then(response => {
    if (response.ok) {
        return response.json();
    }
}).then(data => {
    console.log(data);
}).catch(error => {
    console.error("Rejected", error);
});

