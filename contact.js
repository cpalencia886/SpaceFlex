document.addEventListener("DOMContentLoaded", function() {
  const feedbackForm = document.getElementById("feedbackForm");
  const getInTouchForm = document.getElementById("getInTouchForm");

  // Feedback Section
  function submitFeedback(event) {
      event.preventDefault(); // Prevent the default form submission
      const initialsInput = document.getElementById("initials");
      const commentInput = document.getElementById("comment");
      const feedbackMessage = document.getElementById("feedbackMessage");

      // Message displayed on feedback
      feedbackMessage.textContent = "Thank you for your feedback.";

      // Retrieve existing data from local storage
      const existingData = JSON.parse(localStorage.getItem("feedbackData")) || [];

      // Append new data
      existingData.push({ initials: initialsInput.value, comment: commentInput.value });

      // Save updated data to local storage
      localStorage.setItem("feedbackData", JSON.stringify(existingData));

      // Clear input fields
      initialsInput.value = "";
      commentInput.value = "";
  }

  // Get In Touch Section
  function submitGetInTouchForm(event) {
      event.preventDefault(); // Prevent the default form submission
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const questionsInput = document.getElementById("questions");
      const getInTouchMessage = document.getElementById("getInTouchMessage");

      // Message displayed on get in touch
      getInTouchMessage.textContent = "Thank you for reaching out to us, we'll get back to you as soon as we can.";

      // Retrieve existing data from local storage
      const existingData = JSON.parse(localStorage.getItem("contactData")) || [];

      // Append new data
      existingData.push({ name: nameInput.value, email: emailInput.value, questions: questionsInput.value });

      // Save updated data to local storage
      localStorage.setItem("contactData", JSON.stringify(existingData));

      // Clear input fields
      nameInput.value = "";
      emailInput.value = "";
      questionsInput.value = "";
  }

  // Attach event listeners to the form submit buttons
  document.getElementById("submitFeedbackBtn").addEventListener("click", submitFeedback);
  document.getElementById("sendButton").addEventListener("click", submitGetInTouchForm);
});
