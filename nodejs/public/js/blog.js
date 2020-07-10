const deleteButton = document.querySelector("a.delete");

deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    const endpoint = `/blogs/${deleteButton.dataset.doc}`;
    fetch(endpoint, {
        method: "DELETE",

    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => console.error(err));
});
