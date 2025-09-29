document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("upload-image-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const fileInput = document.getElementById("fileElem");
      const files = fileInput.files;
      if (!files || files.length === 0) {
        showToast("Please upload your image", "error");
        return;
      }
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }
      try {
        const response = await fetch("/v2/admin/upload-image", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.status) {
          showToast(data.message, "success");
          document.getElementById("upload-image-form").reset();
          setInterval(() => {
            window.location.reload();
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
function showToast(message, toastType) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: "top", // or "top"
    position: "right", // left, center, or right
    backgroundColor: toastType === "success" ? "#28a745" : "#dc3545",
  }).showToast();
}
