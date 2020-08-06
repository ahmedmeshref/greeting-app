app = {
    create_greeting_form: document.getElementById("create_greeting"),
    greeting_wrapper : document.getElementById("greetings-wrapper")
}

// ------------------------------------------------------------------------------------------------------
// Render Home List of Greetings
// ------------------------------------------------------------------------------------------------------

function getGreetings (){
    fetch('http://localhost:3000/greeting', {
        method: "get",
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((resVal) => {
            renderGreetings(resVal.greetings);
        })
        .catch((err) => {
            alert("sorry can't find greetings, Refresh the page!");
            console.log(err);
        })
}

let ind = 0;

let renderGreetings = (greetings) => {
    let fragment = document.createDocumentFragment();
    for (const [key, val] of Object.entries(greetings)){
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `${key}: ${val}`;
        fragment.appendChild(li);
    }
    app.greeting_wrapper.appendChild(fragment);
    console.log("successfully rendered all..");
}

getGreetings();



// ------------------------------------------------------------------------------------------------------
// Create New Greeting
// ------------------------------------------------------------------------------------------------------

// Send POST request: create new lang
let create_greeting = (evt) => {
    evt.preventDefault();
    let lang= document.getElementById("lang"),
        greeting= document.getElementById("greeting");
    fetch('http://localhost:3000/greeting', {
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
        .then((res) => res.json())
        .then((resRes) => {
            console.log(resRes);
            renderGreetings(resRes.greeting);
            lang.value = greeting.value = null;
        })
        .catch((err) => {
            console.log(err)
        })
}
app.create_greeting_form.addEventListener('submit', create_greeting);
