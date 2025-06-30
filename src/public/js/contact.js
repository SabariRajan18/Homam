document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const subject = document.getElementById("contact-subject").value;
      const message = document.getElementById("contact-message").value.trim();

      if (name === "") {
        showToast("Please enter your full name", "error");
        return;
      }

      if (email === "") {
        showToast("Please enter your email", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showToast("Please enter a valid email address", "error");
        return;
      }

      if (subject === "") {
        showToast("Please enter your subject", "error");
        return;
      }

      if (message === "") {
        showToast("Please write a message", "error");
        return;
      }
      try {
        const response = await fetch("/v1/users/submit-contact-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
          }),
        });

        const data = await response.json();
        console.log({ data });
        if (data.status) {
          showToast(data.message, "success");
          document.getElementById("contact-form").reset();
        } else {
          showToast(data.message, "error");
        }
      } catch (err) {
        console.error("AJAX error:", err);
        alert("Something went wrong. Please try again later.");
      }
    });
});
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function showToast(message, toastType) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: "top", // or "top"
    position: "right", // left, center, or right
    backgroundColor: toastType === "success" ? "#28a745" : "#dc3545",
  }).showToast();
}
