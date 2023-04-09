import {initializeTables} from './DBManager.js';
import configDB from './configDB.json' assert { type: 'json' };
import express from 'express';
import * as mysql from 'mysql2';

const app = express();
const port = 3000;

const pool = mysql.createPool(configDB);

await initializeTables(pool);

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