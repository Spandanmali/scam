// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

// POST route to save user input
app.post('/save', (req, res) => {
    const userInput = req.body.input;

    // Save the input to a text file
    fs.appendFile('userInput.txt', userInput + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Failed to save data.');
        }
        res.send('Data saved successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
