import {initializeTables, addUser, isValidUser, joinRSO, createRSO} from './DBManager.js';
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

app.post('/create_RSO', async (req, res) => {
    const adminID = req.adminID;
    const RSOName = req.RSOName;

    const createdRSO = await createRSO(pool, adminID, RSOName);

    if (createRSO != true)
        res.status(500).send('Could not create RSO.');
    else
        res.status(200).send('RSO successfully created.');
})

app.post('/join_group', async (req, res) => {
    const userID = req.userID;
    const RSOName = req.RSOName;

    const joinedRSO = await joinRSO(pool, userID, RSOName);

    if (joinedRSO != true)
        res.status(500).send('Could not add user to selected RSO.');
    else {
        res.status(200).send('User successfully added to RSO.');
    }
})

app.get('/login', async (req, res) => {
    const username = req.username;
    const password = req.password;

    const validLogin = await isValidUser(pool, username, password);
    if (validLogin === null) {
        res.status(500).send('Error occured during login.');
    }
    else if (validLogin === false) {
        res.status(409).send("Incorrect username or password.");
    }
    else if (validLogin === true) {
        res.status(200).send("Login was successful.");
    }
})

app.post('/register', async (req, res) => {
    const username = req.username;
    const password = req.password;

    const registrationSuccess = await addUser(pool, username, password);
    if (registrationSuccess === null) {
        res.status(500).send('Error occured during registration.');
    }
    else if (registrationSuccess === false) {
        res.status(409).send("Username is taken.");
    }
    else if (registrationSuccess === true) {
        res.status(200).send("User was successfully registered.")
    }
})

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
})