document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("login-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (email === "") {
        showToast("Please enter your email", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showToast("Please enter a valid email address", "error");
        return;
      }

      if (password === "") {
        showToast("Please enter your subject", "error");
        return;
      }

      try {
        const response = await fetch("/v2/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();
        if (data.status) {
          showToast(data.message, "success");
          document.getElementById("login-form").reset();
          setTimeout(() => {
            window.location.href = "/v2/admin/dashboard";
          }, 1000);
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
