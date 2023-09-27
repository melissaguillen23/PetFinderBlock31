// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    /* GET - client homepage - '/'
    - Create a route for '/'
    - Serve the 'index.html or React application
    - This will render the data in the browser */
    res.sendFile(__dirname + '/public/index.html');

});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    /* GET - all pets - '/api/v1/pets'
    - Create a route for 'api/v1/pets'
    - Connect to the database
    - Fetch all pets from the database
    - Return the pets as a JSON response */
    res.json(pets);

});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    /* GET - pet by owner's name - '/api/v1/pets/owner'
    - Create a route for '/api/v1/pets/owner'
    - Extract the owner's name from the query string of the request
    - Connect to the database
    - Fetch the pet with the given owner's name from the database
    - Return the pet as a JSON response */
    const owner = req.query.owner;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    if (pet) {
            res.json(pet);
        } else {
            res.status(404).send('Pet not found for the given owner');
        }
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    /* GET - pet by name - '/api/v1/pets/:name'
    - Create a route for '/api/v1/pets/:name'
    - Extract the 'name' parameter from the request
    - Connect to the database
    - Fetch the pet with the given name from the database
    - Return the pet as a JSON response */
    const name = req.params.name;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send('Pet not found with the given name');
    }
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;