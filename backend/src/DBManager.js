import * as mysql2 from 'mysql2';

async function getAdminID(pool, userID) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT A.adminID\
            FROM Admins as A\
            WHERE A.userID = ${userID}`
        );
        if (res.length == 0)
            return null;

        return res[0].adminID;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

export async function addPublicEvent(pool, time, description, streetAddress, city, state, userID) {
    const locationID = await addLocation(pool, streetAddress, city, state, null, null);
    if (locationID = null)
        return null;
    const adminID = await getAdminID(pool, userID);
    if (adminID == null)
        return null;
    
    const eventAdded = await addEvent(pool, time, description, streetAddress, city, state);
    if (eventAdded == null)
        return null;
    if (eventAdded == false)
        return false;
    const eventID = await findEventID(pool, time, locationID);

    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `INSERT INTO PublicEvents(eventID, adminID, superAdminID, isAllowed)\
            VALUES (${eventID}, ${adminID}, ${null}, ${null})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

export async function addPrivateEvent(pool, time, description, streetAddress, city, state, userID) {
    const locationID = await addLocation(pool, streetAddress, city, state, null, null);
    if (locationID = null)
        return null;
    const adminID = await getAdminID(pool, userID);
    if (adminID == null)
        return null;
    
    const eventAdded = await addEvent(pool, time, description, streetAddress, city, state);
    if (eventAdded == null)
        return null;
    if (eventAdded == false)
        return false;
    const eventID = await findEventID(pool, time, locationID);

    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `INSERT INTO PrivateEvents(eventID, adminID, superAdminID, isAllowed)\
            VALUES (${eventID}, ${adminID}, ${null}, ${null})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

export async function addRSOEvent(pool, time, description, streetAddress, city, state, RSOID) {
    const locationID = await addLocation(pool, streetAddress, city, state, null, null);
    if (locationID = null)
        return null;
    
    const eventAdded = await addEvent(pool, time, description, streetAddress, city, state);
    if (eventAdded == null)
        return null;
    if (eventAdded == false)
        return false;
    const eventID = await findEventID(pool, time, locationID);

    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `INSERT INTO RSOEvents(eventID, RSOID)\
            VALUES (${eventID}, ${RSOID})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function findEventID(pool, time, locationID) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT E.eventID\
            FROM Events as E\
            WHERE E.time = ${time} AND E.locationID = ${locationID}`
        );

        if (res.length == 0)
            return null;
        else
            return res[0].eventID;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function addLocation(pool, streetAddress, city, state, latitude, longitude) {
    const locationAlreadyExists = await locationExists(pool, streetAddress, city, state);
    if (locationAlreadyExists == null)
        return null;
    if (locationAlreadyExists)
        return false;

    const connection = await connectDB(pool);
    if (!connection)
        return null;
    
    try {
        const res = connection.query(
            `INSERT INTO Locations(streetAddress, city, state, latitude, longitude)\
            VALUES (${streetAddress}, ${city}, ${state}, ${latitude}, ${longitude})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function locationExists(pool, streetAddress, city, state) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT COUNT(*)\
            FROM Locations AS L\
            WHERE L.streetAddress like ${streetAddress} AND L.city like ${city}\
            AND L.state like ${state}`
        );

        if (res.length == 0)
            return false;
        else
            return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function getLocationID(pool, streetAddress, city, state) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT L.locationID\
            FROM Locations AS L\
            WHERE L.streetAddress like ${streetAddress} AND L.city like ${city}\
            AND L.state like ${state}`
        );

        if (res.length == 0)
            return null;
        else
            return res[0].locationID;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

export async function addEvent(pool, time, description, streetAddress, city, state) {
    const slotNotFree = await otherEventSameLocationAndTime(pool, time, locationID);
    if (slotNotFree == null)
        return null;
    if (slotNotFree)
        return false;

    const ensureValidLocation = await addLocation(pool, streetAddress, city, state);
    if (ensureValidLocation == null)
        return null;
    const locationID = await getLocationID(pool, streetAddress, city, state);

    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `INSERT INTO Events(time, description, locationID)\
            VALUES (${time}, ${description}, ${locationID})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function otherEventSameLocationAndTime(pool, time, locationID) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT COUNT(*)\
            FROM Events AS E\
            WHERE E.time = ${time} AND E.locationID = ${locationID}`
        );

        if (res.length == 0)
            return false;
        else
            return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

export async function addUniversity(pool, emailSuffix, description, numStudents, name, locationID, isSuperAdmin) {
    if (!isSuperAdmin)
        return false;

    const universityExists = await universityAlreadyExists(pool, emailSuffix);
    if (universityExists == null)
        return null;
    else if (universityExists)
        return false;

    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `INSERT INTO Universities(emailSuffix, description, numStudents, name, locationID) \
            VALUES (${emailSuffix}, ${description}, ${numStudents}, ${name}, ${locationID})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function universityAlreadyExists(pool, emailSuffix) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT COUNT(*)\
            FROM Universities as Uni\
            WHERE Uni.emailSuffix = ${emailSuffix};`
        );
        if (res == 0)
            return false;
        else
            return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

export async function addSuperAdmin(pool, userID) {
    const isAlreadySuperAdmin = await superAdminAlreadyExists(pool, userID);
    if (isAlreadySuperAdmin == null)
        return null;
    else if (isAlreadySuperAdmin)
        return false;

    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `INSERT INTO SuperAdmins(userID) \
            VALUES (${userID})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function superAdminAlreadyExists(pool, userID) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT COUNT(*)\
            FROM SuperAdmins as SA\
            WHERE SA.userID = ${userID};`
        );
        if (res == 0)
            return false;
        else
            return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

export async function joinGroup(pool, userID, groupID) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `INSERT INTO GroupMembers(userID, groupID) \
            VALUES (${userID}, ${groupID})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

export async function createGroup(pool, userID, groupName) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;
    
    const groupExists = await groupAlreadyExists(pool, groupName);
    if (groupExists == null)
        return null;
    else if (groupExists)
        return false;

    try {
        const res = connection.query(
            `INSERT INTO Groups(leader, groupName) \
            VALUES (${userID}, ${groupName})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function groupAlreadyExists(pool, groupName) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT COUNT(*)\
            FROM Groups as G\
            WHERE G.groupName LIKE ${groupName};`
        );
        if (res == 0)
            return false;
        else
            return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

export async function addAdmin(pool, userID) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;
    
    const isAlreadyAdmin = await adminAlreadyExists(pool, userID);
    if (isAlreadyAdmin == null)
        return null;
    else if (isAlreadyAdmin)
        return false;

    const admin = {
        userID: userID
    };
 
    try {
        const res = connection.query(
            `INSERT INTO RSOs(userID) \
            VALUES (${userID})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function adminAlreadyExists(pool, userID) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT COUNT(*)\
            FROM Admins as A\
            WHERE A.userID = ${userID};`
        );
        if (res == 0)
            return false;
        else
            return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function groupEmailCount(pool, groupID) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT U.emailSuffix\
            FROM Users as U GroupMembers as GM\
            WHERE GM.groupID = ${groupID} AND GM.userID = U.userID;`
        )

        let uniqueEmails = {};
        res.forEach(email => {
            if (email in uniqueEmails)
                uniqueEmails.email++;
            else
                uniqueEmails.email = 1;
        });

        let emailCounts = Object.values(uniqueEmails);
        return Math.min(...emailCounts);
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

export async function createRSO(pool, userID, RSOName, groupID) {
    const RSOAlreadyExists = await isValidRSO(pool, RSOName);
    if (RSOAlreadyExists == true)
        return false;
    else if (RSOAlreadyExists == null)
        return null;
    
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const leaderRes = connection.query(
            `SELECT G.leader\
            FROM Groups as G\
            WHERE G.groupID = ${groupID}`
        );
        if (leaderRes.length != 1)
            return null;
        const isLeader = leaderRes[0].leader == userID;
        if (!isLeader)
            return false;

        const emailCount = await groupEmailCount(pool, groupID);
        if (emailCount == null)
            return null;
        if (emailCount < 5)
            return false;

        const adminAdded = await addAdmin(pool, userID);
        if (adminAdded == null)
            return null;
        const adminRes = connection.query(
            `SELECT A.adminID\
            FROM Admins as A\
            WHERE A.userID = ${userID};`
        );
        if (adminRes.length != 1)
            return null;
        const adminID = adminRes[0].adminID;

        const res = connection.query(
            `INSERT INTO RSOs(adminID, name) \
            VALUES (${adminID}, ${RSOName})`
        );
        
        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }

}

export async function joinRSO(pool, userID, RSOID) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `INSERT INTO RSOMembers(userID, RSOID) \
            VALUES (${userID}, ${RSOID})`
        );

        return true;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
}

async function isValidRSO(pool, RSOName) {
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT *\
            FROM RSOs as R\
            WHERE R.name = ${RSOName};`
        )

        if (res.length < 1)
            return true;
        else
            return false;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        connection.release();
    }
    
}

export async function addUser(pool, username, password, emailSuffix) {
    if (username === null || password === null)
        return null;

    let userExists = await userAlreadyExists(pool, username);
    if (userExists === null)
        return null;
    else if (userExists === false)
        return false;

    const newUser = {
        userID: username,
        password: password,
        emailSuffix: emailSuffix
    };

    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        connection.query(
            `INSERT INTO Users(userID, password, emailSuffix) \
            VALUES (${username}, ${password}, ${emailSuffix})`
        );
        return true;
    }
    catch (err) {
        console.log('Could not add user')
        return null;
    }
    finally {
        connection.release();
    }
}

export async function isValidUser(pool, username, password) {
    if (username === null || password === null)
        return null;

    let isValid = null;

    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        const res = connection.query(
            `SELECT userID\
            FROM Users AS U\
            WHERE U.userID LIKE ${username} AND U.password LIKE ${password};`
        );

        if (res.length === 0) 
            isValid = false;
        else
            isValid = true;
        return isValid;
    }
    catch (err) {
        console.log('Could not validate user');
        return null;
    }
    finally {
        connection.release();
    }
}

async function userAlreadyExists(pool, username) {
    if (username === null)
        return null;

    let exists = null;

    const connection = await pool.connectDB(pool);
    if (!connection)
        return null;
    
    try {
        const res = connection.query(
            `SELECT userID\
            FROM Users as U
            WHERE U.userID LIKE ${username};`
        );

        if (res.length > 0)
            exists = true;
        else
            exists = false;
        return exists;
    }
    catch (err){
        console.log('Could not check for prexisting user');
        return null;
    }
    finally {
        connection.release();
    }
}

export async function initializeTables(pool) {
    const tableSuccesses = [];

    tableSuccesses.push(await createUniversitiesTable(pool));
    tableSuccesses.push(await createImagesTable(pool));
    tableSuccesses.push(await createUsersTable(pool));
    tableSuccesses.push(await createGroupsTable(pool));
    tableSuccesses.push(await createGroupMembersTable(pool));
    tableSuccesses.push(await createAdminsTable(pool));
    tableSuccesses.push(await createSuperAdminsTable(pool));
    tableSuccesses.push(await createLocationsTable(pool));
    tableSuccesses.push(await createEventsTable(pool));
    tableSuccesses.push(await createCommentsTable(pool));
    tableSuccesses.push(await createRSOsTable(pool));
    tableSuccesses.push(await createRSOEventsTable(pool));
    tableSuccesses.push(await createPrivateEventsTable(pool));
    tableSuccesses.push(await createPublicEventsTable(pool));
    tableSuccesses.push(await createRSOMembersTable(pool));

    for (let i=0; i<tableSuccesses.length; i++) {
        if (tableSuccesses[i] !== true) {
            console.log('Not all MySQL tables could be initialized.');
            return false;
        }
    }
    
    return true;
}

async function createUniversitiesTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS Universities(\
            emailSuffix VARCHAR(30),\
            description VARCHAR(200),\
            numStudents INTEGER,\
            name VARCHAR(50) NOT NULL,\
            locationID INTEGER,\
            PRIMARY KEY (emailSuffix),\
            FOREIGN KEY (locationID) REFERENCES Locations(locationID));'
        );
        console.log(`Universities table created -> ${res}`);
    }
    catch(err) {
        console.log('Issue creting Universities table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createImagesTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS Images(\
            imageID INTEGER,\
            image LONGBLOB NOT NULL,\
            emailSuffix VARCHAR(30) NOT NULL,\
            PRIMARY KEY (imageID),\
            FOREIGN KEY (emailSuffix) REFERENCES Universities(emailSuffix));'
        );
        console.log(`Images table created -> ${res}`);
    }
    catch(err) {
        console.log('Issue creting Images table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createUsersTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS Users(\
            userID VARCHAR(30),\
            password VARCHAR(30),\
            emailSuffix VARCHAR(30),\
            PRIMARY KEY (userID),\
            FOREIGN KEY (emailSuffix) REFERENCES Universities(emailSuffix));'
        );
        console.log(`Users table created -> ${res}`);
    }
    catch(err) {
        console.log('Issue creting Users table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createGroupsTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS Groups(\
            groupID INTEGER AUTO_INCREMENT,\
            leader INTEGER NOT NULL,\
            groupName VARCHAR(50),\
            PRIMARY KEY (groupID),\
            FOREIGN KEY (leader) REFERENCES Users(userID));'
        );
        console.log(`Groups table created -> ${res}`);
    }
    catch(err) {
        console.log('Issue creting Groups table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createGroupMembersTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS GroupMembers(\
            userID INTEGER,\
            groupID INTEGER,\
            PRIMARY KEY (userID, groupID),\
            FOREIGN KEY (userID) REFERENCES Users(userID),\
            FOREIGN KEY (groupID) REFERENCES Groups(groupID));'
        );
        console.log(`GroupMembers table created -> ${res}`);
    }
    catch(err) {
        console.log('Issue creting GroupMembers table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createAdminsTable(pool) {
    const connection = await connectDB(pool);
        if (!connection)
            return false;

        try {
            const res = connection.query(
                'CREATE TABLE IF NOT EXISTS Admins(\
                userID VARCHAR(30) NOT NULL,\
                adminID INT,\
                PRIMARY KEY (adminID),\
                FOREIGN KEY (userID) REFERENCES Users(userID)\
                    ON UPDATE CASCADE\
                    ON DELETE CASCADE);'
            );
            console.log(`Admins table created -> ${res}`);
        }
        catch (err) {
            console.log('Issue creting Admins table.');
            return false;
        }
        finally {
            connection.release();
        }
    
    return true;
}

async function createSuperAdminsTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS SuperAdmins(\
            userID VARCHAR(30) NOT NULL,\
            superAdminID INT,\
            PRIMARY KEY (superAdminID),\
            FOREIGN KEY (userID) REFERENCES Users(userID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);'
        );
        console.log(`SuperAdmins table created -> ${res}`);
    }
    catch (err) {
        console.log('Issue creting SuperAdmins table.');
        return false;
    }
    finally {
        connection.release();
    }
    
    return true;
}

async function createLocationsTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS Locations(\
            locationID INT AUTO_INCREMENT,\
            streetAddress VARCHAR(50) NOT NULL,\
            city VARCHAR(30) NOT NULL,\
            state VARCHAR(30) NOT NULL,\
            latitude DECIMAL(8,6),\
            longitude DECIMAL(9,6),\
            PRIMARY KEY (locationID));'
        );
        console.log(`Locations table created -> ${res}`);
    }
    catch (err) {
        console.log('Issue creting Locations table.');
    }
    finally {
        connection.release();
    }

    return true;
}

async function createEventsTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS Events(\
            eventID INT AUTO_INCREMENT,\
            time DATETIME,\
            description VARCHAR(500),\
            locationID INT NOT NULL,\
            PRIMARY KEY (eventID),\
            FOREIGN KEY (locationID) REFERENCES Locations(locationID));'
        );
        console.log(`Events table created -> ${res}`);
    }
    catch (err) {
        console.log('Issue creting Events table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createCommentsTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS Comments(\
            commentID INT AUTO_INCREMENT,\
            eventID INT NOT NULL,\
            userID VARCHAR(30) NOT NULL,\
            utterance VARCHAR(300),\
            rating INT,\
            creationDate DATETIME NOT NULL,\
            PRIMARY KEY (commentID),\
            FOREIGN KEY (eventID) REFERENCES Events(eventID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (userID) REFERENCES Users(userID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);'
        );
        console.log(`Comments table created -> ${res}`);
    }
    catch (err) {
        console.log('Issue creting Comments table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createRSOsTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS RSOs(\
            RSOID INT AUTO_INCREMENT,\
            name VARCHAR(50) NOT NULL,\
            adminID INT NOT NULL,\
            PRIMARY KEY (RSOID),\
            FOREIGN KEY (adminID) REFERENCES Admins(adminID));'
        );
        console.log(`RSOs table created -> ${res}`);
    }
    catch (err) {
        console.log('Issue creting RSOs table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createRSOEventsTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS RSOEvents(\
            eventID INT,\
            RSOID INT NOT NULL,\
            PRIMARY KEY (eventID),\
            FOREIGN KEY (RSOID) REFERENCES RSOs(RSOID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (eventID) REFERENCES Events(eventID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);'
        );
        console.log(`RSOEvents table created -> ${res}`);
    }
    catch (err) {
        console.log('Issue creting RSOEvents table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createPrivateEventsTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS PrivateEvents(\
            eventID INT,\
            adminID INT NOT NULL,\
            superAdminID INT,\
            isAllowed BOOLEAN,\
            PRIMARY KEY (eventID),\
            FOREIGN KEY (eventID) REFERENCES Events(eventID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (adminID) REFERENCES Admins(adminID),\
            FOREIGN KEY (superAdminID) REFERENCES SuperAdmins(superAdminID));'
        );
        console.log(`PrivateEvents table created -> ${res}`);
    }
    catch (err) {
        console.log('Issue creting PrivateEvents table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createPublicEventsTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS PublicEvents(\
            eventID INT,\
            adminID INT NOT NULL,\
            superAdminID INT,\
            isAllowed BOOLEAN,\
            PRIMARY KEY (eventID),\
            FOREIGN KEY (eventID) REFERENCES Events(eventID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (adminID) REFERENCES Admins(adminID),\
            FOREIGN KEY (superAdminID) REFERENCES SuperAdmins(superAdminID));'
        );
        console.log(`PublicEvents table created -> ${res}`);
    }
    catch (err) {
        console.log('Issue creting PublicEvents table.');
        return false;
    }
    finally {
        connection.release();
    }

    return true;
}

async function createRSOMembersTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS RSOMembers(\
            userID VARCHAR(30),\
            RSOID INT,\
            PRIMARY KEY (userID, RSOID),\
            FOREIGN KEY (userID) REFERENCES Users(userID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (RSOID) REFERENCES RSOs(RSOID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);'
        );
        console.log(`RSOMembers table created -> ${res}`);
    }
    catch (err) {
        console.log('Issue creting RSOMembers table.');
        return false;
    }
    finally {
        if (connection)
            connection.release();
    }

    return true;
}

async function connectDB(pool) {
    try {
        const connection = await new Promise( (resolve, reject) => {
            pool.getConnection( (err, conn) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(conn);
                }
            });
        });
        return connection;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}