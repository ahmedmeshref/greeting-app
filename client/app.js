app = {
    create_greeting_form: document.getElementById("create_greeting"),
    greeting_wrapper : document.getElementById("greeting-wrapper")
}

let append_new_greeting = (res) => {
    let LI = document.createElement("li");
    LI.innerHTML = `${res.success}`;
    app.greeting_wrapper.appendChild(LI);
}

// Send POST request: create new lang
let create_greeting = (evt) => {
    evt.preventDefault();
    let lang= document.getElementById("lang"),
        greeting= document.getElementById("greeting");
    fetch('/greeting/create', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            'lang': lang.value,
            'greeting': greeting.value
        })
    })
        .then((res) => JSON.parse(res))
        .then((resObj) => {
            console.log(resObj);
            append_new_greeting(resObj);
        })
        .catch((err) => {console.log(err)})
}
app.create_greeting_form.addEventListener('submit', create_greeting);
