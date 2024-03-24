// Coded by Corazon

document.addEventListener("DOMContentLoaded", function () {

    // Disable the confirm button by default
    document.getElementById("confirmButton").disabled = true;

    // Add event listener to the duration select field
    document.getElementById("duration").addEventListener("change", function () {
        var duration = this.value;
        var startTimeField = document.getElementById("startTime");
        var endTimeField = document.getElementById("endTime");
        // Disable time fields if duration is monthly
        if (duration === "monthly") {
            startTimeField.disabled = true;
            endTimeField.disabled = true;
            startTimeField.value = ""; // Reset time fields
            endTimeField.value = "";
        } else {
            startTimeField.disabled = false;
            endTimeField.disabled = false;
        }
    });

    // Add event listener to the submit button
    document.getElementById("submitButton").addEventListener("click", function () {
        // Get all the input values
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;
        var product = document.getElementById("product").value;
        var duration = document.getElementById("duration").value;
        var bookingDate = document.getElementById("bookingDate").value;
        var startTime = document.getElementById("startTime").value;
        var endTime = document.getElementById("endTime").value;
        var teamCount = parseInt(document.getElementById("teamCount").value);

        // Validate all fields are filled
        if (firstName && lastName && email && phone && address && product && duration && bookingDate && teamCount) {
            // Display user info in order summary
            document.getElementById("nameSummary").textContent = firstName;
            document.getElementById("lastNameSummary").textContent = lastName;
            document.getElementById("emailSummary").textContent = email;
            document.getElementById("phoneSummary").textContent = phone;
            document.getElementById("addressSummary").textContent = address;
            document.getElementById("productSummary").textContent = product;
            document.getElementById("durationSummary").textContent = duration;
            document.getElementById("dateSummary").textContent = bookingDate;
            document.getElementById("teamCountSummary").textContent = teamCount;

            // Calculate total price based on product, duration, and team count
            var totalPrice = calculateTotalPrice(product, duration, teamCount, startTime, endTime);
            document.getElementById("totalPrice").textContent = "$" + totalPrice.toFixed(2);

            // Display total hours if duration is hourly
            var totalHoursSpan = document.getElementById("totalHours");
            if (duration === "hourly") {
                var hours = hoursBetween(startTime, endTime);
                totalHoursSpan.textContent = hours.toFixed(2);
            } else {
                totalHoursSpan.textContent = "----"; // Display "----" if duration is monthly
            }

            // Remove red borders from all fields if they are filled
            removeRedBorders();

            // Enable the confirm button
            document.getElementById("confirmButton").disabled = false;

            // To store booking details
            var bookingDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                product: product,
                duration: duration,
                bookingDate: bookingDate,
                startTime: startTime,
                endTime: endTime,
                teamCount: teamCount
            };

            // Get existing bookings from local storage or initialize an empty array if no bookings exist
            var existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];

            // Add the new booking to the array of existing bookings
            existingBookings.push(bookingDetails);

            // Convert the array of bookings to a JSON string
            var bookingsJSON = JSON.stringify(existingBookings);

            // Save the updated array of bookings to local storage
            localStorage.setItem('bookings', bookingsJSON);
        } else {
            // Add red borders to fields with missing input
            addRedBorders(firstName, "firstName");
            addRedBorders(lastName, "lastName");
            addRedBorders(email, "email");
            addRedBorders(phone, "phone");
            addRedBorders(address, "address");
            addRedBorders(product, "product");
            addRedBorders(duration, "duration");
            addRedBorders(bookingDate, "bookingDate");
            addRedBorders(teamCount, "teamCount");

            alert("Please fill in all fields.");
        }
    });

    // Add event listener to the confirm button
    document.getElementById("confirmButton").addEventListener("click", function () {
        // Display confirmation message
        console.log("Order received, please wait for the confirmation email!");
        alert("Order received, please wait for the confirmation email!");
    });

    // Function to add red border to fields with missing input
    function addRedBorders(inputValue, inputId) {
        if (!inputValue) {
            document.getElementById(inputId).classList.add("missing-input");
        }
    }

    // Function to remove red borders from all fields
    function removeRedBorders() {
        var inputs = document.querySelectorAll("input, select");
        inputs.forEach(function (input) {
            input.classList.remove("missing-input");
        });
    }

    // Function to calculate total price based on product, duration, team count, and hours between start and end time
    function calculateTotalPrice(product, duration, teamCount, startTime, endTime) {
        var price;
        if (duration === "hourly") {
            if (product === "hotDesk") {
                price = 5; // Hourly rate for hot desk is $5
            } else if (product === "privateRoom") {
                price = 30;
            } else if (product === "eventRoom") {
                price = 50;
            }
            // Calculate total price for hourly option based on duration, team count, and hours between start and end time
            var hours = hoursBetween(startTime, endTime);
            return price * hours;
        } else if (duration === "monthly") {
            if (product === "hotDesk") {
                price = 140; // Monthly rate for hot desk is $140
            } else if (product === "privateRoom") {
                price = 850;
            } else if (product === "eventRoom") {
                price = 1350;
            }
            // Return the price for the monthly option (without considering team count)
            return price;
        }
    }

    // Function to calculate the number of hours between two time strings
    function hoursBetween(startTime, endTime) {
        var start = new Date("2024-03-14 " + startTime);
        var end = new Date("2024-03-14 " + endTime);
        var hours = (end - start) / 1000 / 60 / 60; // Convert milliseconds to hours
        return hours;
    }
});
