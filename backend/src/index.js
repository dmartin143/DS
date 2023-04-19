import {initializeTables, addUser, isValidUser, joinRSO, createRSO, createGroup, joinGroup, addSuperAdmin, addUniversity, addRSOEvent, addPrivateEvent, addPublicEvent} from './DBManager.js';
import configDB from './configDB.json' assert { type: 'json' };
import express from 'express';
import * as mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: ['http://localho.st:3000', 'http://localhost:3000'],
    methods: ['OPTIONS', 'POST', 'PUT', 'GET']
}));
const port = 5000;
app.use(express.json());

const pool = mysql.createPool(configDB);

await initializeTables(pool);
// Use this line to get time for MySQL
// new Date().toISOString().slice(0, 19).replace('T', ' ');

app.get('/', (req, res) => {
    res.send('Test')
})

app.post('/add_PublicEvent', async (req, res) => {
    const time = req.body.time;
    const description = req.body.description;
    const streetAddress = req.body.streetAddress;
    const city = req.body.city;
    const state = req.body.state;
    const userID = req.body.userID;

    const addedEvent = await addPublicEvent(pool, time, description, streetAddress, city, state, userID);
    if (addedEvent == null) {
        res.status(500).send('Could not create event');
        return;
    }
    else if (addedEvent == false) {
        res.status(500).send('Event already exists at given place and time');
        return;
    }
    else {
        res.status(200).send('Public event created successfully.');
        return;
    }
        
})

app.post('/add_PrivateEvent', async (req, res) => {
    const time = req.body.time;
    const description = req.body.description;
    const streetAddress = req.body.streetAddress;
    const city = req.body.city;
    const state = req.body.state;
    const userID = req.body.userID;

    const addedEvent = await addPrivateEvent(pool, time, description, streetAddress, city, state, userID);
    if (addedEvent == null) {
        res.status(500).send('Could not create event');
        return;
    }
    else if (addedEvent == false) {
        res.status(500).send('Event already exists at given place and time');
        return;
    }
    else {
        res.status(200).send('Private event created successfully.');
        return;
    }
        
})

app.post('/add_RSOEvent', async (req, res) => {
    const time = req.body.time;
    const description = req.body.description;
    const streetAddress = req.body.streetAddress;
    const city = req.body.city;
    const state = req.body.state;
    const RSOID = req.body.RSOID;

    const addedEvent = await addRSOEvent(pool, time, description, streetAddress, city, state, RSOID);
    if (addedEvent == null) {
        res.status(500).send('Could not create event');
        return;
    }
    else if (addedEvent == false) {
        res.status(500).send('Event already exists at given place and time');
        return;
    }
    else {
        res.status(200).send('RSO event created successfully.');
        return;
    }
        
})

app.post('/create_university', async (req, res) => {
    const emailSuffix = req.body.emailSuffix;
    const description = req.body.description;
    const numStudents = req.body.numStudents;
    const name = req.body.name;
    const locationID = req.body.locationID;
    const isSuperAdmin = req.body.isSuperAdmin;

    const addedUniversity = addUniversity(pool, emailSuffix, description, numStudents, name, locationID, isSuperAdmin);
    if (addUniversity == null) {
        res.status(500).send("Could not create university.");
        return;
    }
    else if (addUniversity == false) {
        res.status(500).send("University with selected email suffix already exists.");
        return;
    }
    else {
        res.status(200).send("University successfully created.");
        return;
    }
        
})

app.post('/join_group', async (req, res) => {
    const userID = req.body.userID;
    const groupID = req.body.groupID;

    const joinedGroup = await joinGroup(pool, userID, groupID);

    if (joinedRSO != true) {
        res.status(500).send('Could not add user to selected RSO.');
        return;
    }
    else {
        res.status(200).send('User successfully added to RSO.');
        return;
    }
})

app.post('/create_group', async (req, res) => {
    const userID = req.body.userID;
    const groupName = req.body.groupName;

    const createdGroup = await createGroup(pool, userID, groupName);

    if (createGroup == null) {
        res.status(500).send("Could not create group.");
        return;
    }
    else if (createGroup == false) {
        res.status(500).send("Group with selected name already exists.");
        return;
    }
    else {
        res.status(200).send("Group successfully created.");
        return;
    }
        
})

app.post('/create_RSO', async (req, res) => {
    const userID = req.body.userID;
    const RSOName = req.body.RSOName;
    const groupID = req.body.groupID;

    const createdRSO = await createRSO(pool, userID, RSOName, groupID);

    if (createRSO != true) {
        res.status(500).send('Could not create RSO.');
        return;
    }     
    else {
        res.status(200).send('RSO successfully created.');
        return;
    }
        
})

app.post('/join_RSO', async (req, res) => {
    const userID = req.body.userID;
    const RSOID = req.body.RSOID;

    const joinedRSO = await joinRSO(pool, userID, RSOID);

    if (joinedRSO != true) {
        res.status(500).send('Could not add user to selected RSO.');
        return;
    }
    else {
        res.status(200).send('User successfully added to RSO.');
        return;
    }
})

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const validLogin = await isValidUser(pool, username, password);
    if (validLogin === null) {
        res.status(500).send('Error occured during login.');
        return;
    }
    else if (validLogin === false) {
        res.status(409).send("Incorrect username or password.");
        return;
    }
    else if (validLogin === true) {
        res.status(200).send("Login was successful.");
        return;
    }
})

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const emailSuffix = req.body.emailSuffix;
    const isSuperAdmin = req.body.isSuperAdmin;
    console.log(`${username} ${password} ${emailSuffix}`);

    const registrationSuccess = await addUser(pool, username, password, emailSuffix);
    if (registrationSuccess === null) {
        res.status(500).send('Error occured during registration.');
        return;
    }
    else if (registrationSuccess === false) {
        res.status(409).send("Username is taken.");
        return;
    }
    
    if (!isSuperAdmin) {
        res.status(200).send("User was successfully registered.");
        return;
    }

    else {
        const addedSuperAdmin = await addSuperAdmin(pool, username);
        if (addedSuperAdmin === null) {
            res.status(500).send('Error occured during registration.');
            return;
        }
        else if (addedSuperAdmin === false) {
            res.status(500).send("User is already a SuperAdmin.");
            return;
        }
        else {
            res.status(200).send('User successfully added as a SuperAdmin.');
            return;
        }
    }
})

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
})