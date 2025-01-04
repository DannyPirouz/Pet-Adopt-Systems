
const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

async function fetchAnimaltableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM ANIMAL');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchStafftableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Staff');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchVetstableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Vets');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE DEMOTABLE`);
        } catch (err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE DEMOTABLE (
                id NUMBER PRIMARY KEY,
                name VARCHAR2(20)
            )
        `);
        return true;
    }).catch(() => {
        return false;
    });
}


// Update Query
async function updateAnimalTable(animal_id, newBreed, newAge, newStatus, newName, newGender, newColour, new_shelter_address, new_shelter_name, new_adopters_email) {

    if (newBreed) {
        if (!(await updateBreed(animal_id, newBreed))) {
            return false;
        };
    }
    if (newAge) {
        if (!(await updateAge(animal_id, newAge))) {
            return false;
        };
    }
    if (newStatus) {
        if (!(await updateStatus(animal_id, newStatus))) {
            return false;
        };
    }
    if (newName) {
        if (!(await updateName(animal_id, newName))) {
            return false;
        };
    }
    if (newGender) {
        if (!(await updateGender(animal_id, newGender))) {
            return false;
        };
    }
    if (newColour) {
        if (!(await updateColour(animal_id, newColour))) {
            return false;
        };
    }

    if (new_shelter_address && new_shelter_name) {
        if (!(await updateShelter(animal_id, new_shelter_address, new_shelter_name))) {
            return false;
        };
    }
    if (new_adopters_email) {
        if (!(await updateAdoptersEmail(animal_id, new_adopters_email))) {
            return false;
        }
    }

    return true;
}

async function updateBreed(animal_id, newBreed) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Animal 
            SET breed=:newBreed
            where animal_id=:animal_id`,
            [newBreed, animal_id],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateAge(animal_id, newAge) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Animal 
            SET age=:newAge
            where animal_id=:animal_id`,
            [newAge, animal_id],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateStatus(animal_id, newStatus) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Animal 
            SET status=:newStatus
            where animal_id=:animal_id`,
            [newStatus, animal_id],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateName(animal_id, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Animal 
            SET name=:newName
            where animal_id=:animal_id`,
            [newName, animal_id],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateGender(animal_id, newGender) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Animal 
            SET gender=:newGender
            where animal_id=:animal_id`,
            [newGender, animal_id],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateColour(animal_id, newColour) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Animal 
            SET colour=:newColour
            where animal_id=:animal_id`,
            [newColour, animal_id],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateShelter(animal_id, new_shelter_address, new_shelter_name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Animal 
            SET shelter_address=:new_shelter_address,
            shelter_name=:new_shelter_name
            where animal_id=:animal_id`,
            [new_shelter_address, new_shelter_name, animal_id],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}


async function updateAdoptersEmail(animal_id, new_adopters_email) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Animal 
            SET adopters_email=:new_adopters_email
            where animal_id=:animal_id`,
            [new_adopters_email, animal_id],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// Update Staff Queries

async function updateStaffTable(StaffID, Name, Role, phoneNumber, Email) {

    if (Name) {
        if (!(await updateStaffName(StaffID, Name))) {
            return false;
        };
    }
    if (Role) {
        if (!(await updateStaffRole(StaffID, Role))) {
            return false;
        };
    }
    if (phoneNumber) {
        if (!(await updateStaffPhoneNumber(StaffID, phoneNumber))) {
            return false;
        };
    }
    if (Email) {
        if (!(await updateStaffEmail(StaffID, Email))) {
            return false;
        };
    }
    return true;
}

async function updateStaffName(StaffID, Name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Staff 
            SET name=:Name
            where staff_id=:StaffID`,
            [Name, StaffID],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateStaffRole(StaffID, Role) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Staff 
            SET role=:Role
            where staff_id=:StaffID`,
            [Role, StaffID],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateStaffPhoneNumber(StaffID, phoneNumber) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Staff 
            SET phone_number=:phoneNumber
            where staff_id=:StaffID`,
            [phoneNumber, StaffID],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateStaffEmail(StaffID, Email) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE Staff 
            SET email=:Email
            where staff_id=:StaffID
            AND NOT EXISTS (
            SELECT *
            FROM Staff
            WHERE email=:Email)`,
            [Email, StaffID],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// Projection Query
async function projectAnimalTable(attributes) {
    const validAttributes = ["animal_id", "breed", "age",
        "status", "name", "gender", "colour",
        "medical_record_number", "shelter_address",
        "shelter_name", "adopters_email"];

    const myAttributes = attributes.filter(butes => validAttributes.includes(butes)).join(", ");

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT ${myAttributes} 
            FROM ANIMAL`
        );
        return result.rows;
    }).catch(() => {
        return false;
    });
}

// Query type satisfied: JOIN
async function getVetSpeciality(animalgender) {

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT A.animal_id, A.gender, T.vet_id_number, V.speciality
             FROM Animal A, Vets V, TreatsAnimals T
             WHERE T.vet_id_number = V.vet_id_number 
             AND T.animal_id = A.animal_id 
             AND A.gender = :animalgender`,
            [animalgender],
            { autoCommit: false }
        );
        return result.rows;
    }).catch(() => {
        return false;
    });
}



// Nested Aggregation with Group By Query

async function getAverageAgeGroupedByBreed() {

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT breed, AVG(age)
            FROM ANIMAL A1
            WHERE A1.breed IN (SELECT breed
                            FROM ANIMAL A2
                            GROUP BY breed
                            HAVING COUNT(*) >= 2)
            GROUP BY breed`
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// Query type satisfied: DELETE
async function deleteVet(vet_id_number) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM Vets V
            WHERE V.vet_id_number = :vet_id_number`,
            { vet_id_number },
            { autoCommit: true }
        );
        return (result.rowsAffected && result.rowsAffected > 0);
    }).catch((err) => {
        return false;
    })
}

//  Query: Aggregation with HAVING
async function findMaxDonators() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT D1.name, D.email, SUM(D.amount) AS total_amount
            FROM Donate2 D, Donators D1
            WHERE D.email = D1.email
            GROUP BY D1.name, D.email
            HAVING SUM(D.amount) > 400`
        );
        return result.rows;
    }).catch(() => {
        return [];
    })
}

async function insertAnimal(animalData) {
    return await withOracleDB(async (connection) => {
        try {
            console.log("Animal Data:", animalData);
            await connection.execute(
                `INSERT INTO MedicalRecord (
                    record_number, vaccinations, medical_condition, spayed_neutered, animal_id
                ) VALUES (
                    :record_number, :vaccinations, :medical_condition, :spayed_neutered, :animal_id
                )`,
                {
                    record_number: animalData.animal_id,
                    vaccinations: animalData.vaccinations,
                    medical_condition: animalData.medical_condition,
                    spayed_neutered: animalData.spayed_neutered,
                    animal_id: animalData.animal_id,
                },
                { autoCommit: false }
            );

            await connection.execute(
                `INSERT INTO Animal (
                    animal_id, breed, age, status, name, gender, colour,
                    medical_record_number, shelter_address, shelter_name, adopters_email
                ) VALUES (
                    :animal_id, :breed, :age, 'Available', :name, :gender, :colour,
                    :medical_record_number, :shelter_address, :shelter_name, NULL
                )`,
                {
                    animal_id: animalData.animal_id,
                    breed: animalData.breed,
                    age: animalData.age,
                    name: animalData.name,
                    gender: animalData.gender,
                    colour: animalData.colour,
                    medical_record_number: animalData.animal_id,
                    shelter_address: animalData.shelter_address,
                    shelter_name: animalData.shelter_name,
                },
                { autoCommit: false }
            );

            await connection.commit();
            return true;
        } catch (error) {
            console.error("Error inserting animal and medical record:", error);

            await connection.rollback();
            return false;
        }
    });
}




async function getUniqueAttributesFromAnimalTable() {
    return await withOracleDB(async (connection) => {
        const attributes = {};

        attributes.breed = (await connection.execute(`SELECT DISTINCT breed FROM Animal`)).rows;
        attributes.age = (await connection.execute(`SELECT DISTINCT age FROM Animal`)).rows;
        attributes.status = (await connection.execute(`SELECT DISTINCT status FROM Animal`)).rows;
        attributes.gender = (await connection.execute(`SELECT DISTINCT gender FROM Animal`)).rows;
        attributes.colour = (await connection.execute(`SELECT DISTINCT colour FROM Animal`)).rows;
        attributes.shelter_name = (await connection.execute(`SELECT DISTINCT shelter_name FROM Animal`)).rows;

        return attributes;
    });
}

async function selectionForDropDown(filters) {
    return await withOracleDB(async (connection) => {
        let sql = `
            SELECT A.breed, A.age, A.status, A.name, A.gender, A.colour, A.shelter_name
            FROM Animal A
            WHERE 1=1`;

        const params = [];
        let paramIndex = 0;

        Object.keys(filters).forEach((key) => {
            if (filters[key].length > 0) {
                const orConditions = filters[key]
                    .map((value) => {
                        params.push(value);
                        return `${key} = :param${paramIndex++}`;
                    })
                    .join(' OR ');
                sql += ` AND (${orConditions})`;
            }
        });

        const result = await connection.execute(sql, params);
        return result.rows;
    });
}


async function fetchYoungestInShelter() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT SHELTER_NAME, SHELTER_ADDRESS, MIN(AGE) AS MIN_AGE
            FROM ANIMAL
            GROUP BY SHELTER_NAME, SHELTER_ADDRESS
            ORDER BY MIN_AGE ASC
        `);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getDonatorsForAllShelters() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT D.name
            FROM Donators D
            WHERE NOT EXISTS (
                SELECT S.address, S.name
                FROM Shelter S
                WHERE NOT EXISTS (
                    SELECT D2.address, D2.name
                    FROM Donate2 D2
                    WHERE D2.email = D.email AND D2.address = S.address AND D2.name = S.name
                )
            )
        `);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getShelters() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`SELECT DISTINCT address, name FROM Shelter`);
        return result.rows;
    });
}

module.exports = {
    projectAnimalTable,
    getAverageAgeGroupedByBreed,
    deleteVet,
    findMaxDonators,
    insertAnimal,
    selectionForDropDown,
    getUniqueAttributesFromAnimalTable,
    testOracleConnection,
    fetchAnimaltableFromDb,
    initiateDemotable,
    fetchYoungestInShelter,
    updateAnimalTable,
    getDonatorsForAllShelters,
    updateStaffTable,
    fetchStafftableFromDb,
    getShelters,
    fetchVetstableFromDb,
    getVetSpeciality
};
