const express = require('express');
const appService = require('./appService');

const router = express.Router();


// ADD YOUR QUERIES DOWN BELOW


// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/animalTable', async (req, res) => {
    const tableContent = await appService.fetchAnimaltableFromDb();
    res.json({ data: tableContent });
});

router.get('/staffTable', async (req, res) => {
    const tableContent = await appService.fetchStafftableFromDb();
    res.json({ data: tableContent });
});

router.get('/vetsTable', async (req, res) => {
    const tableContent = await appService.fetchVetstableFromDb();
    res.json({ data: tableContent });
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});


router.post('/update-animal-table', async (req, res) => {
    const { animalID, breed, age, status, name, gender, colour, shelterAdd, shelterName, adoptersEmail } = req.body;
    const updateResult = await appService.updateAnimalTable(animalID, breed, age, status, name, gender, colour, shelterAdd, shelterName, adoptersEmail);

    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post('/update-staff-table', async (req, res) => {
    const { StaffID, Name, Role, phoneNumber, Email } = req.body;
    const updateResult = await appService.updateStaffTable(StaffID, Name, Role, phoneNumber, Email);

    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post('/project-animal-table', async (req, res) => {

    // should be array of attributes
    const { attributes } = req.body;
    const projectResult = await appService.projectAnimalTable(attributes);
    if (projectResult) {
        res.json({ success: true, data: projectResult });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post('/get-vet-speciality-for-animals', async (req, res) => {

    // should be array of attributes
    const { animalgender } = req.body;
    console.log(animalgender);
    const projectResult = await appService.getVetSpeciality(animalgender);
    if (projectResult) {
        res.json({ success: true, data: projectResult });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/get-oldest-animals-grouped-by-breed', async (req, res) => {
    const oldestAnimalGroupedByBreed = await appService.getAverageAgeGroupedByBreed();
    if (oldestAnimalGroupedByBreed) {
        res.json({ data: oldestAnimalGroupedByBreed });
    } else {
        res.status(500).json({ success: false });
    }
});


router.delete('/delete-vet', async (req, res) => {
    const { vet_id_number } = req.body;
    const deletedvet = await appService.deleteVet(vet_id_number);
    if (deletedvet) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
})

router.post('/find-max-donators', async (req, res) => {
    const result = await appService.findMaxDonators();
    res.json({ data: result });
});

router.post('/add-animal', async (req, res) => {
    const { animalData } = req.body;

    if (!animalData) {
        return res.status(400).json({ message: "Invalid request. Missing required data." });
    }

    const medicalRecordData = {
        record_number: animalData.animal_id,
        vaccinations: animalData.vaccinations,
        medical_condition: animalData.medical_condition,
        spayed_neutered: animalData.spayed_neutered,
    };

    try {
        const success = await appService.insertAnimal(animalData, medicalRecordData);

        if (success) {
            res.status(200).json({ message: "Animal added successfully." });
        } else {
            res.status(500).json({ message: "Failed to add animal." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while adding the animal." });
    }
});

router.get('/drop-down-distinct-animal-attributes', async (req, res) => {
    try {
        const filters = await appService.getUniqueAttributesFromAnimalTable();
        res.status(200).json(filters);
    } catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).json({ error: 'Failed to fetch filters.' });
    }
});

router.post('/select-from-drop-form', async (req, res) => {
    try {
        const filters = req.body;
        const results = await appService.selectionForDropDown(filters);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ error: 'Failed to perform search.' });
    }
});

router.get('/youngestShelter', async (req, res) => {
    const youngestShelterContent = await appService.fetchYoungestInShelter();
    res.json({ data: youngestShelterContent });
});

router.get('/donatorsAllShelters', async (req, res) => {
    const donatorsData = await appService.getDonatorsForAllShelters();
    res.json({ data: donatorsData });
});

router.get('/get-shelters', async (req, res) => {
    try {
        const sheltersData = await appService.getShelters();
        res.json({ data: sheltersData });
    } catch (error) {
        console.error('Error fetching shelters:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch shelters.' });
    }
});


module.exports = router;