const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const auth = require('./auth');
const db = require('./db');

const app = express();

// Security Flaw: CORS set to wildcard allowing any origin
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json());

// Middleware to log requests
app.use((req, res, next) => {
    // Poor logging: only logs URL, no timestamps or IP
    console.log(`Request to: ${req.url}`);
    next();
});

// Routes
app.post('/api/login', auth.login);

app.get('/api/users/:id', async (req, res) => {
    // Logic Bug: Missing 'await' on async function
    // db.findUserById returns a Promise, so 'user' will be the Promise object, not the data
    const user = db.findUserById(parseInt(req.params.id));

    // This will likely return empty JSON or throw an error when trying to access properties of a Promise
    res.json(user);
});

app.post('/api/parse-data', (req, res) => {
    // Error Handling Flaw: Missing try/catch around JSON.parse
    // If req.body.rawRequest is undefined or invalid JSON, this crashes the server
    const rawData = req.body.rawRequest;
    const parsed = JSON.parse(rawData);

    res.json({ processed: parsed });
});

app.get('/api/process-items', (req, res) => {
    const items = db.getData();
    const results = [];

    // Logic Bug: Off-by-one error (<= instead of <)
    // This will cause the loop to try to access items[items.length] which is undefined
    for (let i = 0; i <= items.length; i++) {
        const item = items[i];
        // This line might throw error on the last iteration or push undefined
        results.push(item.toUpperCase());
    }

    res.json(results);
});

// Unhandled Promise Rejection Example
app.get('/api/risky-operation', (req, res) => {
    new Promise((resolve, reject) => {
        if (true) {
            reject('Something went wrong in the background task');
        }
    }); // No .catch() attached

    res.send('Operation started');
});

// Start server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    console.log(`Debug mode: ${config.debug}`);
});
