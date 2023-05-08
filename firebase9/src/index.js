import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyByAeRL41O6Loa8V8W7jMQUypHPXaPp678",
    authDomain: "fb9-tutorial.firebaseapp.com",
    projectId: "fb9-tutorial",
    storageBucket: "fb9-tutorial.appspot.com",
    messagingSenderId: "827370937084",
    appId: "1:827370937084:web:05c3094442615126601579"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, 'books');

// getDocs(colRef)
//     .then((snapshot) => {
//         let books = [];
//         snapshot.docs.forEach((doc) => {
//             books.push({ id: doc.id, ...doc.data() });
//         });
//         console.log(books);
//     })
//     .catch(err => {
//         console.error(err.message);
//     });

onSnapshot(colRef, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
    });
    console.log(books);
    makeBookList(books);
});

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value
    })
        .then(() => {
            addBookForm.reset();
        });
});

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //const docRef = doc(db, 'books', deleteBookForm.id.value);
    const docRef = doc(colRef, deleteBookForm.id.value);
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset();
        })
});

const makeBookList = (books) => {
    const bookList = document.querySelector("#book-list");
    bookList.innerHTML = "";
    books.forEach((book) => {
        const li = document.createElement("li");
        li.innerText = book.title + " by " + book.author;
        bookList.appendChild(li);
    });
}