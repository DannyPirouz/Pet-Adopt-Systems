/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */
// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
        .then((text) => {
            statusElem.textContent = text;
        })
        .catch((error) => {
            statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
        });
}

// Fetches data from the demotable and displays it.
async function fetchAndDisplayAnimals() {
    const tableElement = document.getElementById('animalTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/animalTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const animaltableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }
    console.log(animaltableContent);
    animaltableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// This function resets or initializes the demotable.
async function resetDemotable() {
    const response = await fetch("/initiate-demotable", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "demotable initiated successfully!";
        await fetchTableData();
    } else {
        alert("Error initiating table!");
    }
}

// Inserts new records into the demotable.
async function insertDemotable(event) {
    event.preventDefault();

    const idValue = document.getElementById('insertId').value;
    const nameValue = document.getElementById('insertName').value;

    const response = await fetch('/insert-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idValue,
            name: nameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        await fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

// Updates names in the demotable.
async function updateNameDemotable(event) {
    event.preventDefault();

    const oldNameValue = document.getElementById('updateOldName').value;
    const newNameValue = document.getElementById('updateNewName').value;

    const response = await fetch('/update-name-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldName: oldNameValue,
            newName: newNameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateNameResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Name updated successfully!";
        await fetchTableData();
    } else {
        messageElement.textContent = "Error updating name!";
    }
}

// Counts rows in the demotable.
// Modify the function accordingly if using different aggregate functions or procedures.
async function findOldestGroupedByBreed() {

    const tableElement = document.getElementById('oldestAnimalsTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/get-oldest-animals-grouped-by-breed', {
        method: 'GET'
    });

    const responseData = await response.json();
    const animaltableContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    animaltableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}
// find the top donators
async function findMaxDonators() {

    const tableElement = document.getElementById('maxDonatorsTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/find-max-donators', {
        method: 'POST'
    });

    const responseData = await response.json();
    console.log(responseData);
    const donatetableContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }
    console.log(donatetableContent);

    donatetableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayYoungestShelter() {
    const tableElement = document.getElementById('youngestInShelterTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/youngestShelter', {
        method: 'GET'
    });

    const responseData = await response.json();
    const youngestShelterContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    youngestShelterContent.forEach(group => {
        const row = tableBody.insertRow();
        group.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function projectAttributes(event) {
    event.preventDefault();

    // https://javascript.plainenglish.io/how-to-get-the-value-of-a-checked-checkbox-with-javascript-31a4a9c572da
    // https://www.geeksforgeeks.org/fastest-way-to-convert-javascript-nodelist-to-array/
    const checkedBoxes = document.querySelectorAll('input[name="attributes"]:checked');
    console.log(checkedBoxes);
    const selectedAttributes = Array.from(checkedBoxes).map(box => box.value);
    console.log(selectedAttributes);

    if (selectedAttributes.length === 0) {
        alert("Please select at least one attribute!");
        return;
    }


    const response = await fetch('/project-animal-table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ attributes: selectedAttributes })
    });

    const responseData = await response.json();

    if (responseData.success) {
        const tHead = document.getElementById('projectionHead');
        const tBody = document.getElementById('projectionBody');
        tHead.innerHTML = '';
        tBody.innerHTML = '';

        const hRow = tHead.insertRow();
        selectedAttributes.forEach(attr => {
            const th = document.createElement('th');
            th.textContent = attr;
            hRow.appendChild(th);
        });

        responseData.data.forEach(user => {
            const row = tBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });

    } else {
        alert("Error projecting attributes!");
    }

}

async function findVetSpecialities(event) {
    event.preventDefault();

    const checkedBoxes = document.querySelector('input[name="chosengender"]:checked');
    console.log(checkedBoxes);
    console.log("checked box");

    if (!checkedBoxes) {
        alert("Please select a gender!");
        return;
    }

    const checkedBox = checkedBoxes.value;
    console.log(checkedBox);
    const response = await fetch('/get-vet-speciality-for-animals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ animalgender: checkedBox })
    });

    const tableElement = document.getElementById('vetSpecialityTable');
    const tableBody = tableElement.querySelector('tbody');


    const responseData = await response.json();
    const vetspecialitytableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }
    console.log(vetspecialitytableContent);
    vetspecialitytableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}


// https://www.youtube.com/watch?v=vYFZDRraMnw&t=598s <- Sanitize
async function updateAnimalTable(event) {
    event.preventDefault();

    const animal_id = document.getElementById('animal_ID').value;
    const newBreed = document.getElementById('newBreed').value;
    const newAge = document.getElementById('newAge').value;
    const newStatus = document.getElementById('newStatus').value;
    const newName = document.getElementById('newName').value;
    const newGender = document.getElementById('newGender').value;
    const newColour = document.getElementById('newColour').value;
    const new_shelter_address = document.getElementById('new_shelter_address').value;
    const new_shelter_name = document.getElementById('new_shelter_name').value;
    const new_adopters_email = document.getElementById('new_adopters_email').value;

    if (!animal_id) {
        alert("Please enter an Animal ID to update");
        return;
    }
    if (!newBreed && !newAge && !newStatus && !newName && !newGender && !newColour && !new_shelter_address && !new_shelter_name && !new_adopters_email) {
        alert("Please enter values to update");
        return;
    }
    if ((new_shelter_address && !new_shelter_name) || (!new_shelter_address && new_shelter_name)) {
        alert("Please enter both shelter name and address");
        return;
    }
    const response = await fetch('/update-animal-table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            animalID: animal_id,
            breed: newBreed,
            age: newAge,
            status: newStatus,
            name: newName,
            gender: newGender,
            colour: newColour,
            shelterAdd: new_shelter_address,
            shelterName: new_shelter_name,
            adoptersEmail: new_adopters_email,
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('responseMessage');

    if (responseData.success) {
        messageElement.textContent = "Animal updated successfully!";
        await fetchTableData();
    } else {
        messageElement.textContent = "Error Updating Animal! Make sure Animal ID, shelter info, and adopter's email are Valid";
    }
}

async function fetchAndDisplayStaff() {
    const tableElement = document.getElementById('staffTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/staffTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const stafftableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }
    stafftableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function updateStaffTable(event) {
    event.preventDefault();

    const staff_id = document.getElementById('staff_ID').value;
    const staffName = document.getElementById('staffName').value;
    const staffRole = document.getElementById('staffRole').value;
    const staffPhoneNumber = document.getElementById('staffPhoneNumber').value;
    const staffEmail = document.getElementById('staffEmail').value;

    if (!staff_id) {
        alert("Please enter a valid Staff ID to update");
        return;
    }
    if (!staffName && !staffRole && !staffPhoneNumber && !staffEmail) {
        alert("Please enter values to update");
        return;
    }

    const response = await fetch('/update-staff-table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            StaffID: staff_id,
            Name: staffName,
            Role: staffRole,
            phoneNumber: staffPhoneNumber,
            Email: staffEmail
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('staffResponseMessage');

    if (responseData.success) {
        messageElement.textContent = "Staff updated successfully!";
        await fetchTableData();
    } else {
        messageElement.textContent = "Error Updating Staff!";
    }
}

async function fetchAndDisplayVets() {
    const tableElement = document.getElementById('vetTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/vetsTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const vetstableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }
    vetstableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function deleteFromVetsTable(event) {
    event.preventDefault();

    const vet_id = document.getElementById('vet_ID').value;


    if (!vet_id) {
        alert("Please enter a valid vet ID to delete");
        return;
    }

    const response = await fetch('/delete-vet', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vet_id_number: vet_id })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('vetResponseMessage');

    if (responseData.success) {
        messageElement.textContent = "Vet deleted successfully!";
        await fetchTableData();
    } else {
        messageElement.textContent = "The Vet does not exist!";
    }
}



async function getAndDisplayDonatorsAllShelters() {
    const tableElement = document.getElementById('donatorsAllSheltersTable');
    const tableBody = tableElement.querySelector('tbody');

    try {
        const response = await fetch('/donatorsAllShelters', {
            method: 'GET'
        });

        const responseData = await response.json();
        const donatorsData = responseData.data;

        if (tableBody) {
            tableBody.innerHTML = '';
        }

        donatorsData.forEach(donator => {
            const row = tableBody.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = donator[0];
        });
    } catch (error) {
        console.error('Error fetching donators for all shelters:', error);
    }
}

async function populateFilters() {
    try {
        const response = await fetch('/drop-down-distinct-animal-attributes', { method: 'GET' });
        const responseData = await response.json();

        Object.keys(responseData).forEach((key) => {
            const select = document.getElementById(`filter_${key}`);
            if (!select) {
                console.error(`No dropdown found for key: ${key}`);
                return;
            }

            select.innerHTML = '';

            responseData[key].forEach((value) => {
                const option = document.createElement('option');
                option.value = Array.isArray(value) ? value[0] : value;
                option.textContent = Array.isArray(value) ? value[0] : value;
                select.appendChild(option);
            });
        });

    } catch (error) {
        console.error('Error populating filters:', error);
    }
}

function populateResultsTable(results) {
    const tableHeader = document.getElementById('results-header');
    const tableBody = document.getElementById('results-body');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    if (results.length === 0) {
        const noDataRow = document.createElement('tr');
        const noDataCell = document.createElement('td');
        noDataCell.colSpan = 100;
        noDataCell.textContent = 'No results found';
        noDataRow.appendChild(noDataCell);
        tableBody.appendChild(noDataRow);
        return;
    }

    const headers = ["Breed", "Age", "Status", "Name", "Gender", "Colour", "Shelter Name"];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    results.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach((cellValue, index) => {
            const td = document.createElement('td');
            td.textContent = cellValue;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

async function submitFilterForm(e) {
    e.preventDefault();

    const filters = {};
    const formElements = e.target.elements;
    for (let element of formElements) {
        if (element.tagName === 'SELECT') {
            const selectedValues = Array.from(element.selectedOptions).map(option => option.value);

            if (selectedValues.length > 0) {
                if (!filters[element.name]) {
                    filters[element.name] = [];
                }
                filters[element.name].push(...selectedValues);
            }
        }
    }


    try {
        const response = await fetch('/select-from-drop-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filters),
        });

        const results = await response.json();
        populateResultsTable(results);
    } catch (error) {
        console.error('Error fetching results:', error);
    }
}


function resetFilters() {
    const formElements = document.getElementById('filter-form').elements;

    for (let element of formElements) {
        if (element.tagName === 'SELECT') {
            Array.from(element.options).forEach(option => {
                option.selected = false;
            });
        }
    }

    const tableElement = document.getElementById('results-table');
    if (tableElement) {
        const tableBody = tableElement.querySelector('tbody');
        if (tableBody) {
            tableBody.innerHTML = '';
        }
    }
}

function getAnimalFormData() {
    const selectedShelter = JSON.parse(document.getElementById('selectShelter').value);

    const animalData = {
        animal_id: parseInt(document.getElementById("insertId").value, 10),
        breed: document.getElementById("insertBreed").value,
        age: parseInt(document.getElementById("insertAge").value, 10),
        status: 'Available',
        name: document.getElementById("insertName").value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || null,
        colour: document.getElementById("insertColour").value,
        shelter_address: selectedShelter.address,
        shelter_name: selectedShelter.name,
        vaccinations: parseInt(document.getElementById("insertVaccinations").value, 10) || 0,
        medical_condition: document.getElementById("insertMedicalCondition").value || "None",
        spayed_neutered: document.getElementById("insertSpayedNeutered").checked ? "YES" : "NO",
    };

    if (!animalData.gender) {
        throw new Error("Please select a gender.");
    }

    return animalData;
}



async function submitAnimalData(event) {
    event.preventDefault();

    const messageElement = document.getElementById('insertResultMsg');
    messageElement.textContent = "";

    try {
        const animalData = getAnimalFormData();

        const response = await fetch('/add-animal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ animalData }),
        });

        const responseData = await response.json();

        if (response.ok) {
            messageElement.textContent = "Animal added successfully!";
            messageElement.style.color = "green";
            await fetchTableData();
            event.target.reset();
        } else {
            messageElement.textContent = responseData.message || "Error inserting data!";
            messageElement.style.color = "red";
        }
    } catch (error) {
        console.error("Error submitting animal data:", error);
        messageElement.textContent = "An error occurred while adding the animal.";
        messageElement.style.color = "red";
    }
}

async function populateShelterDropdown() {
    try {
        const response = await fetch('/get-shelters');
        const data = await response.json();

        console.log("Shelter Data Response:", data);

        if (response.ok && data.data) {
            const selectShelter = document.getElementById('selectShelter');

            selectShelter.innerHTML = '<option value="" disabled selected>Select a Shelter</option>';

            data.data.forEach(([address, name]) => {
                const option = document.createElement('option');
                option.value = JSON.stringify({ name, address });
                option.textContent = `${name} (${address})`;
                selectShelter.appendChild(option);
            });
        } else {
            console.error('Failed to fetch shelters:', data.message || "Unexpected error");
        }
    } catch (error) {
        console.error('Error populating shelter dropdown:', error);
    }
}







// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function () {
    checkDbConnection();
    fetchTableData();
    populateFilters();
    populateShelterDropdown();
    document.getElementById("updateAnimalForm").addEventListener("submit", updateAnimalTable);
    document.getElementById("updateStaffForm").addEventListener("submit", updateStaffTable);
    document.getElementById("deleteVetsForm").addEventListener("submit", deleteFromVetsTable);
    document.getElementById("oldestAnimalsByBreed").addEventListener("click", findOldestGroupedByBreed);
    document.getElementById("maxDonators").addEventListener("click", findMaxDonators);
    document.getElementById('youngestInShelterButton').addEventListener('click', fetchAndDisplayYoungestShelter)
    document.getElementById("projectButton").addEventListener("click", projectAttributes);
    document.getElementById("vetSpecialityButton").addEventListener("click", findVetSpecialities);
    document.getElementById('donatorsAllSheltersButton').addEventListener('click', getAndDisplayDonatorsAllShelters);
    document.getElementById('reset-button').addEventListener('click', resetFilters);
    document.getElementById('filter-form').addEventListener('submit', submitFilterForm);
    document.getElementById("insertAnimalTable").addEventListener("submit", submitAnimalData);

};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
async function fetchTableData() {
    await fetchAndDisplayAnimals();
    await fetchAndDisplayStaff();
    await fetchAndDisplayVets();
}
