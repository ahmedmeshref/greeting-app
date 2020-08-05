/* initialize express application */
const express = require('express');
let app = express();


/* App Configurations */
const bodyParser = require('body-parser'),
    cors = require('cors');
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
    "en": "Hi",
    "fr": "Bonjure"
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
app.get("/greeting", function (req, res){
    res.send(
        JSON.stringify({
            'success': true,
            'greetings': greetings
        })
    )
})

// add new greetings 
app.post("/greeting", addNewGreeting)
function addNewGreeting (req, res){
    console.log(req.body);
    res.send(
        JSON.stringify({
            'success': true,
            'greetings': greetings
        })
    );
}



/* Server */
const port = 9000,
    server = app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    });
