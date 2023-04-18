import {initializeTables, addUser, isValidUser, joinRSO, createRSO, createGroup, joinGroup, addSuperAdmin, addUniversity} from './DBManager.js';
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

app.post('/create_university', async (req, res) => {
    const emailSuffix = req.emailSuffix;
    const description = req.description;
    const numStudents = req.numStudents;
    const name = req.name;
    const locationID = req.locationID;
    const isSuperAdmin = req.isSuperAdmin;

    const addedUniversity = addUniversity(pool, emailSuffix, description, numStudents, name, locationID, isSuperAdmin);
    if (addUniversity == null)
        res.status(500).send("Could not create university.");
    else if (addUniversity == false)
        res.status(500).send("University with selected email suffix already exists.");
    else
        res.status(200).send("University successfully created.");
})

app.post('/join_group', async (req, res) => {
    const userID = req.userID;
    const groupID = req.groupID;

    const joinedGroup = await joinGroup(pool, userID, groupID);

    if (joinedRSO != true)
        res.status(500).send('Could not add user to selected RSO.');
    else {
        res.status(200).send('User successfully added to RSO.');
    }
})

app.post('/create_group', async (req, res) => {
    const userID = req.userID;
    const groupName = req.groupName;

    const createdGroup = await createGroup(pool, userID, groupName);

    if (createGroup == null)
        res.status(500).send("Could not create group.");
    else if (createGroup == false)
        res.status(500).send("Group with selected name already exists.");
    else
        res.status(200).send("Group successfully created.");
})

app.post('/create_RSO', async (req, res) => {
    const userID = req.userID;
    const RSOName = req.RSOName;
    const groupID = req.groupID;

    const createdRSO = await createRSO(pool, userID, RSOName, groupID);

    if (createRSO != true)
        res.status(500).send('Could not create RSO.');
    else
        res.status(200).send('RSO successfully created.');
})

app.post('/join_RSO', async (req, res) => {
    const userID = req.userID;
    const RSOID = req.RSOID;

    const joinedRSO = await joinRSO(pool, userID, RSOID);

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
    const emailSuffix = req.emailSuffix;
    const isSuperAdmin = req.isSuperAdmin;

    const registrationSuccess = await addUser(pool, username, password, emailSuffix);
    if (registrationSuccess === null) 
        res.status(500).send('Error occured during registration.');
    else if (registrationSuccess === false) 
        res.status(409).send("Username is taken.");
    
    if (!isSuperAdmin)
        res.status(200).send("User was successfully registered.");

    else {
        const addedSuperAdmin = await addSuperAdmin(pool, username);
        if (addSuperAdmin === null) 
            res.status(500).send('Error occured during registration.');
        else if (addSuperAdmin === false)
            res.status(500).send("User is already a SuperAdmin.");
        else
            res.status(200).send('User successfully added as a SuperAdmin.');
    }
})

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
})