app = {
    create_greeting_form: document.getElementById("create_greeting"),
    greeting_wrapper: document.getElementById("greetings-wrapper")
}

// ------------------------------------------------------------------------------------------------------
// Utils
// ------------------------------------------------------------------------------------------------------

let print = (txt) => {
    console.log(txt);
}

let sendReq = async (url, req_method, data = null) => {
    let res = await fetch(url, {
        method: req_method,
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin',
        body: data ? JSON.stringify(data) : data
    });
    return res.json()
}


// ------------------------------------------------------------------------------------------------------
// Render Home List of Greetings
// ------------------------------------------------------------------------------------------------------

function getGreetings() {
    sendReq('http://localhost:3000/greeting', "GET")
        .then((resVal) => renderGreetings(resVal.greetings))
        .catch((err) => {
            alert("sorry can't find greetings, Refresh the page!");
            print(err);
        })
}


let renderGreetings = (greetings) => {
    let fragment = document.createDocumentFragment();
    for (const [key, val] of Object.entries(greetings)) {
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `${key}: ${val}`;
        fragment.appendChild(li);
    }
    app.greeting_wrapper.appendChild(fragment);
    print("successfully rendered all..");
}

getGreetings();

// ------------------------------------------------------------------------------------------------------
// Create New Greeting
// ------------------------------------------------------------------------------------------------------

// Send POST request: create new lang
let create_greeting = (evt) => {
    evt.preventDefault();
    const lang = document.getElementById("lang"),
        greeting = document.getElementById("greeting"),
        data = {
            'lang': lang.value,
            'greeting': greeting.value
        },
        url = 'http://localhost:3000/greeting',
        method = "POST";
    sendReq(url, method, data)
        .then((resRes) => {
            renderGreetings(resRes.greeting);
            lang.value = greeting.value = null;
        })
        .catch((err) => {
            print(err)
        })
}
app.create_greeting_form.addEventListener('submit', create_greeting);