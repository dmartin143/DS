const mysql = require('mysql2');

function isValidUser(pool, username, password) {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        
    })
}

function initializeTables(pool) {
    createUsersTable(pool);
    createAdminsTable(pool);
    createSuperAdminsTable(pool);
    createLocationsTable(pool);
    createEventsTable(pool);
    createCommentsTable(pool);
    createRSOsTable(pool);
    createRSOEventsTable(pool);
    createPrivateEventsTable(pool);
    createPublicEventsTable(pool);
    createRSOMembersTable(pool);

    return true;
}

function createUsersTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS Users(\
            userID INT,\
            PRIMARY KEY (userID));', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting Users table.');
                    throw err;
                }

                console.log(`Users table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}

function createAdminsTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS Admins(\
            userID INT NOT NULL,\
            adminID INT,\
            PRIMARY KEY (adminID)\
                FOREIGN KEY (userID) REFERENCES Users\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting Admins table.');
                    throw err;
                }

                console.log(`Admins table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}

function createSuperAdminsTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS SuperAdmins(\
            userID INT NOT NULL,\
            superAdminID INT,\
            PRIMARY KEY (superAdminID)\
                FOREIGN KEY (userID) REFERENCES Users\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting SuperAdmins table.');
                    throw err;
                }

                console.log(`SuperAdmins table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}

function createLocationsTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS Locations(\
            locationID INT AUTO_INCREMENT,\
            streetAddress VARCHAR(50) NOT NULL,\
            city VARCHAR(30) NOT NULL,\
            state VARCHAR(30) NOT NULL,\
            latitude DECIMAAL(8,6)\
            longitude DECIMAL(9,6)\
            PRIMARY KEY (locationID));', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting Locations table.');
                    throw err;
                }

                console.log(`Locations table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}

function createEventsTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS Events(\
            eventID INT AUTO_INCREMENT,\
            time DATETIME,\
            description VARCHAR(500),\
            locationID INT NOT NULL,\
            PRIMARY KEY (eventID),\
            FOREIGN KEY (locationID) REFERENCES Locations);', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting Events table.');
                    throw err;
                }

                console.log(`Events table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}

function createCommentsTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS Comments(\
            commentID INT AUTO INCREMENT,\
            eventID INT NOT NULL,\
            userID INT NOT NULL\
            text VARCHAR(300),\
            rating INT,\
            timestamp DATETIME NOT NULL,\
            PRIMARY KEY (commentID),\
            FOREIGN KEY (eventID) REFERENCES Events\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (userID) REFERENCES Users\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting Comments table.');
                    throw err;
                }

                console.log(`Comments table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}

function createRSOsTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS RSOs(\
            RSOID INT AUTO INCREMENT,\
            adminID INT NOT NULL,\
            PRIMARY KEY (RSOID),\
            FOREIGN KEY (adminID) REFERENCES Admins);', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting RSOs table.');
                    throw err;
                }

                console.log(`RSOs table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}

function createRSOEventsTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS RSOEvents(\
            eventID INT,\
            RSOID INT NOT NULL,\
            PRIMARY KEY (eventID),\
            FOREIGN KEY (RSOID) REFERENCES RSOs\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (eventID) REFERENCES Events\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting RSOEvents table.');
                    throw err;
                }

                console.log(`RSOEvents table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}

function createPrivateEventsTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS PrivateEvents(\
            eventID INT,\
            adminID INT NOT NULL,\
            superAdminID INT,\
            isAllowed BOOLEAN,\
            PRIMARY KEY (eventID),\
            FOREIGN KEY (eventID) REFERENCES Events\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (adminID) REFERENCES Admins,\
            FOREIGN KEY (superAdminID) REFERENCES SuperAdmins);', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting PrivateEvents table.');
                    throw err;
                }

                console.log(`PrivateEvents table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}

function createPublicEventsTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS PublicEvents(\
            eventID INT,\
            adminID INT NOT NULL,\
            superAdminID INT,\
            isAllowed BOOLEAN,\
            PRIMARY KEY (eventID),\
            FOREIGN KEY (eventID) REFERENCES Events\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (adminID) REFERENCES Admins,\
            FOREIGN KEY (superAdminID) REFERENCES SuperAdmins);', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting PublicEvents table.');
                    throw err;
                }

                console.log(`PublicEvents table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}

function createRSOMembersTable(pool) {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'CREATE TABLE IF NOT EXISTS RSOMembers(\
            userID INT,\
            RSOID INT,\
            PRIMARY KEY (userID, RSOID)\
            FOREIGN KEY (userID) REFERENCES Users\
                ON UPDATE CASCADE\
                ON DELETE CASCADE,\
            FOREIGN KEY (RSOID) REFERENCES RSOs\
                ON UPDATE CASCADE\
                ON DELETE CASCADE);', 
            (err, res) => {
                if (err) {
                    connection.release();
                    console.log('Issue creting RSOMembers table.');
                    throw err;
                }

                console.log(`RSOMembers table created -> ${res}`);
                connection.release();
        });
    });

    return true;
}