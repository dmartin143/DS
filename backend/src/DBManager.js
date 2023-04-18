import * as mysql2 from 'mysql2';

export async function createRSO(pool, adminID, RSOName) {
    const RSOAlreadyExists = await isValidRSO(pool, RSOName);
    if (RSOAlreadyExists == true)
        return false;
    else if (RSOAlreadyExists == null)
        return null;
    
    const connection = await connectDB(pool);
    if (!connection)
        return null;

    const RSO = {
        adminID: adminID,
        name: RSOName
    };

    try {
        const res = connection.query(
            `INSERT INTO RSOs SET ?`, RSO
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

    const RSOExists = await isValidRSO(pool, RSOName);
    const userExists = await userAlreadyExists(pool, userID);

    const relation = {
        userID: userID,
        RSOName: RSOName
    };

    if (RSOExists != true || userExists != true)
        return false;

    try {
        const res = connection.query(
            `INSERT INTO RSOMembers SET ?`, relation
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

export async function addUser(pool, username, password) {
    if (username === null || password === null)
        return null;

    let userExists = await userAlreadyExists(pool, username);
    if (userExists === null)
        return null;
    else if (userExists === false)
        return false;

    const newUser = {
        userID: username,
        password
    };

    const connection = await connectDB(pool);
    if (!connection)
        return null;

    try {
        connection.query(
            'INSERT INTO Users SET ?', newUser
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

    tableSuccesses.push(await createUsersTable(pool));
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

async function createUsersTable(pool) {
    const connection = await connectDB(pool);
    if (!connection)
        return false;

    try {
        const res = connection.query(
            'CREATE TABLE IF NOT EXISTS Users(\
            userID VARCHAR(30),\
            password VARCHAR(30),\
            PRIMARY KEY (userID));'
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
            name VARCHAR(50),\
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