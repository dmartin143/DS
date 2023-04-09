import * as mysql2 from 'mysql2';

function isValidUser(pool, username, password) {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        
    })
}

export async function initializeTables(pool) {
    try {
        await createUsersTable(pool);
        await createAdminsTable(pool);
        await createSuperAdminsTable(pool);
        await createLocationsTable(pool);
        await createEventsTable(pool);
        await createCommentsTable(pool);
        await createRSOsTable(pool);
        await createRSOEventsTable(pool);
        await createPrivateEventsTable(pool);
        await createPublicEventsTable(pool);
        await createRSOMembersTable(pool);
    }
    catch {
        throw new error('Not all MySQL tables could be initialized.')
    }

    return true;
}

async function createUsersTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {connection.query(
            'CREATE TABLE IF NOT EXISTS Users(\
            userID INT,\
            PRIMARY KEY (userID));'
            )
        }).then( (res) => {
                console.log(`Users table created -> ${res}`);
                connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting Users table.');
            throw err;
        });
    });

    return true;
}

async function createAdminsTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {
            connection.query(
            'CREATE TABLE IF NOT EXISTS Admins(\
            userID INT NOT NULL,\
            adminID INT,\
            PRIMARY KEY (adminID),\
            FOREIGN KEY (userID) REFERENCES Users(userID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);'
            )
        }).then( (res) => {
            console.log(`Admins table created -> ${res}`);
            connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting Admins table.');
            throw err;
        });
    });

    return true;
}

async function createSuperAdminsTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {
            connection.query(
            'CREATE TABLE IF NOT EXISTS SuperAdmins(\
            userID INT NOT NULL,\
            superAdminID INT,\
            PRIMARY KEY (superAdminID),\
            FOREIGN KEY (userID) REFERENCES Users(userID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);'
            )
        }).then( (res) => {
            console.log(`SuperAdmins table created -> ${res}`);
            connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting SuperAdmins table.');
            throw err;
        });
    });

    return true;
}

async function createLocationsTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {
            connection.query(
            'CREATE TABLE IF NOT EXISTS Locations(\
            locationID INT AUTO_INCREMENT,\
            streetAddress VARCHAR(50) NOT NULL,\
            city VARCHAR(30) NOT NULL,\
            state VARCHAR(30) NOT NULL,\
            latitude DECIMAL(8,6),\
            longitude DECIMAL(9,6),\
            PRIMARY KEY (locationID));'
            )
        }).then( (res) => {
            console.log(`Locations table created -> ${res}`);
            connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting Locations table.');
            throw err;
        });
    });

    return true;
}

async function createEventsTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {
            connection.query(
            'CREATE TABLE IF NOT EXISTS Events(\
            eventID INT AUTO_INCREMENT,\
            time DATETIME,\
            description VARCHAR(500),\
            locationID INT NOT NULL,\
            PRIMARY KEY (eventID),\
            FOREIGN KEY (locationID) REFERENCES Locations(locationID));'
            )
        }).then( (res) => {
            console.log(`Events table created -> ${res}`);
            connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting Events table.');
            throw err;
        });
    });

    return true;
}

async function createCommentsTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {
            connection.query(
            'CREATE TABLE IF NOT EXISTS Comments(\
            commentID INT AUTO_INCREMENT,\
            eventID INT NOT NULL,\
            userID INT NOT NULL,\
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
            )
        }).then( (res) => {
            console.log(`Comments table created -> ${res}`);
            connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting Comments table.');
            throw err;
        });
    });

    return true;
}

async function createRSOsTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {
            connection.query(
            'CREATE TABLE IF NOT EXISTS RSOs(\
            RSOID INT AUTO_INCREMENT,\
            adminID INT NOT NULL,\
            PRIMARY KEY (RSOID),\
            FOREIGN KEY (adminID) REFERENCES Admins(adminID));'
            )
        }).then( (res) => {
            console.log(`RSOs table created -> ${res}`);
            connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting RSOs table.');
            throw err;
        });
    });

    return true;
}

async function createRSOEventsTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {
            connection.query(
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
            )
        }).then( (res) => {
            console.log(`RSOEvents table created -> ${res}`);
            connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting RSOEvents table.');
            throw err;
        });
    });

    return true;
}

async function createPrivateEventsTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {
            connection.query(
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
            )
        }).then( (res) => {
            console.log(`PrivateEvents table created -> ${res}`);
            connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting PrivateEvents table.');
            throw err;
        });
    });

    return true;
}

async function createPublicEventsTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {
            connection.query(
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
            )
        }).then( (res) => {
            console.log(`PublicEvents table created -> ${res}`);
            connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting PublicEvents table.');
            throw err;
        });
    });

    return true;
}

async function createRSOMembersTable(pool) {
    await pool.getConnection( async (err, connection) => {
        if (err) throw err;

        await new Promise( () => {
            connection.query(
            'CREATE TABLE IF NOT EXISTS RSOMembers(\
            userID INT,\
            RSOID INT,\
            PRIMARY KEY (userID, RSOID),\
            FOREIGN KEY (userID) REFERENCES Users(userID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (RSOID) REFERENCES RSOs(RSOID)\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);'
            )
        }).then( (res) => {
            console.log(`RSOMembers table created -> ${res}`);
            connection.release();
        }).catch( (err) => {
            connection.release();
            console.log('Issue creting RSOMembers table.');
            throw err;
        });
    });

    return true;
}