let bookingResult;

document.addEventListener('DOMContentLoaded', function() {
    const confirmButton = document.getElementById('confirmButton');
    const messageDiv = document.getElementById('message');
    const bookingForm = document.querySelector('.booking-form');
    const confirmationTable = document.getElementById('confirmation-table');

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // function calculateTotalTime(startTime, endTime) {
    //     const start = new Date(`01/01/2000 ${startTime}`);
    //     const end = new Date(`01/01/2000 ${endTime}`);
    //     const totalTimeInMinutes = (end - start) / (1000 * 60);
    //     const hours = Math.floor(totalTimeInMinutes / 60);
    //     const minutes = totalTimeInMinutes % 60;

    //     let totalTime = '';
    //     if (hours > 0) {
    //         totalTime += `${hours} hour${hours > 1 ? 's' : ''}`;
    //     }
    //     if (minutes > 0) {
    //         totalTime += `${hours > 0 ? ' ' : ''}${minutes} min${minutes > 1 ? 's' : ''}`;
    //     }
    //     return totalTime;
    // }

    function getHourlyRate(space) {
        switch (space) {
            case 'Executive Suite':
                return 45;
            case 'Sunlit Studio':
                return 20;
            case 'Private Room':
                return 25;
            case 'Window Table':
                return 15;
            case 'Event Room':
                return 50;
            case 'The Hive':
                return 20;
            case 'Hot Desk':
                return 5;
            case 'The Gathering':
                return 120;
            case 'Big Studio':
                return 75;
            case 'Mini Studio':
                return 30;
            case 'Innovation Hub':
                return 60;
            default:
                return 0;
        }
    }

    function calculateHourlyPrice(hourlyRate, totalTime) {
        const hours = parseInt(totalTime.split(' ')[0]);
        return `$${hourlyRate * hours}`;
    }

    function getMonthlyRate(space) {
        switch (space) {
            case 'Executive Suite':
                return '$1000';
            case 'Sunlit Studio':
                return '$450';
            case 'Private Room':
                return '$600';
            case 'Window Table':
                return '$350';
            case 'Event Room':
                return '$1350';
            case 'The Hive':
                return '$450';
            case 'Hot Desk':
                return '$140';
            case 'The Gathering':
                return '$3000';
            case 'Big Studio':
                return '$1800';
            case 'Mini Studio':
                return '$750';
            case 'Innovation Hub':
                return '$1400';
            default:
                return '$0';
        }
    }

    function updateAddressOptions(space) {
        const addressDropdown = document.getElementById('address');
        const availableAddresses = new Set();

        switch (space) {
            case 'Executive Suite':
                availableAddresses.add('Address 1');
                break;
            case 'Sunlit Studio':
                availableAddresses.add('Address 3');
                break;
            case 'Private Room':
                availableAddresses.add('Address 1');
                availableAddresses.add('Address 2');
                availableAddresses.add('Address 3');
                availableAddresses.add('Address 4');
                break;
            case 'Window Table':
                availableAddresses.add('Address 2');
                break;
            case 'Event Room':
                availableAddresses.add('Address 4');
                break;
            case 'The Hive':
                availableAddresses.add('Address 3');
                break;
            case 'Hot Desk':
                availableAddresses.add('Address 1');
                availableAddresses.add('Address 2');
                availableAddresses.add('Address 3');
                availableAddresses.add('Address 4');
                break;
            case 'The Gathering':
                availableAddresses.add('Address 2');
                break;
            case 'Big Studio':
                availableAddresses.add('Address 1');
                break;
            case 'Mini Studio':
                availableAddresses.add('Address 2');
                break;
            case 'Innovation Hub':
                availableAddresses.add('Address 4');
                break;
            default:
                break;
        }

        addressDropdown.innerHTML = '<option value="" disabled selected>-- Select Address --</option>';
        availableAddresses.forEach(address => {
            const option = document.createElement('option');
            option.textContent = address;
            option.value = address;
            addressDropdown.appendChild(option);
        });
    }

    document.getElementById('space').addEventListener('change', function() {
        const space = this.value;
        updateAddressOptions(space);
    });

    confirmButton.addEventListener('click', async function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const space = document.getElementById('space').value;
        const duration = document.getElementById('duration').value;
        const bookingDate = document.getElementById('bookingDate').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;

        const inputFields = document.querySelectorAll('.form-group input[type="text"], .form-group input[type="email"], .form-group input[type="tel"]');
        inputFields.forEach(input => {
            input.style.borderColor = '';
        });

        const dropdowns = document.querySelectorAll('.form-group select');
        let isError = false;

        inputFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                isError = true;
            }
        });

        dropdowns.forEach(dropdown => {
            if (!dropdown.value) {
                dropdown.style.borderColor = 'red';
                isError = true;
            }
        });

        if (isError) {
            displayErrorMessage("Please fill out all fields.");
            return;
        }

        if (!validateEmail(email)) {
            displayErrorMessage("Please enter a valid email address.");
            return;
        }

        // let totalPrice = '';
        // let totalTime = '';
        // if (duration !== 'Monthly') {
        //     totalTime = calculateTotalTime(startTime, endTime);
        //     const hourlyRate = getHourlyRate(space);
        //     totalPrice = calculateHourlyPrice(hourlyRate, totalTime);
        // } else {
        //     totalTime = '---';
        //     totalPrice = getMonthlyRate(space);
        // }

        const bookingDetails = {
            firstName,
            lastName,
            email,
            phone,
            address,
            space,
            duration,
            bookingDate,
            startTime,
            endTime,
            // totalTime,
            // totalPrice, 
        };

        // Fetch request
        // TODO: update the url
        bookingResult = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });

        console.log(bookingResult);

        // Display confirmation details
        document.getElementById('conf-firstName').textContent = bookingResult.firstName;
        document.getElementById('conf-lastName').textContent = bookingResult.lastName;
        document.getElementById('conf-email').textContent = bookingResult.email;
        document.getElementById('conf-phone').textContent = bookingResult.phone;
        document.getElementById('conf-address').textContent = bookingResult.address;
        document.getElementById('conf-space').textContent = bookingResult.space;
        document.getElementById('conf-duration').textContent = bookingResult.duration;
        document.getElementById('conf-bookingDate').textContent = bookingResult.bookingDate;
        document.getElementById('conf-totalTime').textContent = bookingResult.totalTime;
        document.getElementById('conf-price').textContent = bookingResult.totalPrice;

        bookingForm.classList.add('hidden');
        confirmationTable.classList.remove('hidden');
    });

    function displayErrorMessage(message) {
        messageDiv.textContent = message;
        messageDiv.style.color = 'red';
    }

    document.getElementById('duration').addEventListener('change', function() {
        const duration = this.value;
        const startTimeInput = document.getElementById('startTime');
        const endTimeInput = document.getElementById('endTime');
        if (duration === 'Monthly') {
            startTimeInput.value = '';
            endTimeInput.value = '';
            startTimeInput.disabled = true;
            endTimeInput.disabled = true;
        } else {
            startTimeInput.disabled = false;
            endTimeInput.disabled = false;
        }
    });
});
