import {initializeTables} from './DBManager.js';
const configDB = require('./configDB.json')
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const pool = mysql.createPool(configDB);

let tablesCreated = initializeTables(pool);
if (!tablesCreated)
    throw new Error('Not all MySQL tables were properly created from the database manager.');

app.get('/', (req, res) => {
    res.send('Test')
})

app.get('/login', (req, res) => {

})

app.post('register', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
})