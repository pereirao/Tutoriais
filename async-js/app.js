const getTodos = (callback) => {
    //const url = "https://jsonplaceholder.typicode.com/todos/";
    const url = "todos/adam.json";
    const req = new XMLHttpRequest();
    req.addEventListener("readystatechange", () => {
        if (req.readyState === 4) {
            console.log(req.responseText);
            if (req.status === 200) {
                callback(undefined, JSON.parse(req.responseText));
            }
            else {
                callback(req.statusText, undefined);
            }
        }
    });
    req.open("GET", url);
    req.send();
}


const todoCB = (error, data) => {
    if (!error) {
        console.log(data);
    }
    else {
        console.error(error);
    }
};

getTodos(todoCB);