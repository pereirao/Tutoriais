function handleCredentialResponse(response) {
    const result = document.getElementById("result")
    const data = jwt_decode(response.credential);
    result.innerHTML = "";
    Object.keys(data).forEach((k) => {
        if (k === "picture") {
            const p = document.createElement("img");
            p.src = data[k];
            result.appendChild(p);
        }
        else {
            const p = document.createElement("p");
            p.innerHTML = k + ": " + data[k];
            result.appendChild(p);
        }
    })
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "85082161771-jbk8qo2vahrlf0m5ufpcmjilha33h56j.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "filled_black", size: "medium" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}
