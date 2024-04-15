document.getElementById("submit-btn").onclick = handleFormSubmission;

// Function to handle form submission
async function handleFormSubmission(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('office-form'));
    const address = formData.get('address');
    const squareFootage = formData.get('squareFootage');
    const capacity = formData.get('capacity');
    const access = formData.get('access');
    const price = formData.get('price');

    // Clear all input fields after form submission
    document.getElementById('office-form').reset();

    // Upload office data to the server
    let officeData = await fetch('http://localhost:5000/api/offices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address, squareFootage, capacity, access, price })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add office listing');
        }
        return response.json();
    })

    console.log(officeData)
    appendOfficeToList(officeData)
}

// Function to append office data to the UI
function appendOfficeToList(office) {
    const officeContent = document.getElementById('office-content');
    const noOfficeMessage = document.getElementById('no-office-message');

    // Create a new office listing element
    const officeBox = document.createElement('div');
    officeBox.classList.add('office-box');
    officeBox.innerHTML = `
        <p class="editable" data-field="address">Address: ${office.address}</p>
        <p class="editable" data-field="squareFootage">Square Footage: ${office.squareFootage}</p>
        <p class="editable" data-field="capacity">Capacity: ${office.capacity}</p>
        <p class="editable" data-field="access">Access: ${office.access}</p>
        <p class="editable" data-field="price">Price per Hour: ${office.price}</p>
        <button class="editBtn"> Edit</button>
    `;

    const editButton = officeBox.querySelector('.editBtn');
    editButton.id = `edit-btn-${office._id}`;
    editButton.addEventListener('click', () => handleEditButtonClick(officeBox));

    // Append the new office listing to the existing ones
    officeContent.appendChild(officeBox);

    // Hide the "No office listed" message
    noOfficeMessage.style.display = 'none';
}

// Function to handle edit button click
function handleEditButtonClick(officeBox) {
    const editButton = officeBox.querySelector('.editBtn');
    const editableFields = officeBox.querySelectorAll('.editable');

    if (editButton.innerText === 'Edit') {
        editButton.innerText = 'Save';
        editableFields.forEach(field => {
            field.contentEditable = true;
            field.classList.add('editableActive');
        });
    }
    else {
        editButton.innerText = 'Edit';
        editableFields.forEach(field => {
            field.contentEditable = false;
            field.classList.remove('editableActive');
        })
        
        const updatedOffice = {};
        editableFields.forEach(field => {
            const fieldName = field.dataset.field;
            updatedOffice[fieldName] = field.innerText.trim();
        })

        const officeId = officeBox.dataset.officeId;
        fetch('http://localhost:3000/api/offices/${officeId}', {
            method: 'PUT',
            headers: {
                'ContentType': 'application/json'
            },
            body: JSON.stringify(updatedOffice)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to update office listing');
            }
            console.log('Office data updated successfully');
        });
    }
}


// Show message if there are no office listings
document.addEventListener('DOMContentLoaded', function() {
    const officeContent = document.getElementById('office-content');
    const noOfficeMessage = document.getElementById('no-office-message');
    noOfficeMessage.style.display = officeContent.children.length === 0 ? 'block' : 'none';
});
