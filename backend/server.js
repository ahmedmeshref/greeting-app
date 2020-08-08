/* initialize express application */
const express = require('express');
let app = express();


/* App Configurations */
const bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path');
// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Initialize cors on app to allow for cross origin allowance
app.use(cors());


/*
Initialize the main website folder.
- This line of code connects our server-side code (the code in the server.js file) to our client-side code
  (the browser code written in the files housed in the website folder).
 */
app.use(express.static('client'));

// books obj
let greetings = {
    "EN": "Hi",
    "FR": "Bonjure"
}

/* Routes */
// home route
app.get("/", (req, res) => {
    res.send(
        JSON.stringify({
            "success": true,
            "greeting": "Hey, how are you?"
        })
    )
})

// get greetings route
app.get("/greeting", function (req, res) {
    res.send(
        JSON.stringify({
            'success': true,
            'greetings': greetings
        })
    )
})

// FOR LEARNING // GET: create new greetings page
// app.get("/greeting/create", showNewGreetingPage)
// function showNewGreetingPage (req, res){
//     // render a create new page;
//     res.sendFile(path.join(__dirname+'/client/views/create_greeting.html'));
// }

// POST: create new greetings
app.post("/greeting", createNewGreeting)

function createNewGreeting(req, res) {
    // NOTE: req.body comes as an object, same as flask, it was sent as a JSON but received as dict.
    let new_greeting = req.body,
        lang = new_greeting["lang"] ? new_greeting["lang"].toUpperCase() : null,
        greeting = new_greeting["greeting"] ? new_greeting["greeting"][0].toUpperCase() +
            new_greeting["greeting"].slice(1,) : null;
    if (lang && greeting && !(lang in greetings)) {
        greetings[lang] = greeting;
        let created_greeting = {[lang]: greeting}
        res.send(
            JSON.stringify({
                'success': true,
                'greeting': created_greeting
            })
        );
    } else {
        res.status(400).send(
            JSON.stringify({
                'success': false,
                'message': "bad request"
            })
        );
    }
}


/* Server */
const port = 3000,
    server = app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    });
