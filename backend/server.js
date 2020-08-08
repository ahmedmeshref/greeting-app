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


// books obj
let greetings = {
    "EN": "Hi",
    "FR": "Bonjure"
}

/* Routes */
// home route
app.get("/", function (req, res) {
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
        res.send(
            JSON.stringify({
                'success': false,
                'msg': "Err: Lang already exists."
            })
        );
    }
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/* Server */
const port = 3000,
    server = app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    });
