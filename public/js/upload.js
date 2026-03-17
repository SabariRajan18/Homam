document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("admin-auth-token");

  if (!token) {
    window.location.href = "/v2/admin/login";
    return;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("upload-image-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const fileInput = document.getElementById("fileElem");
      const files = fileInput.files;

      if (!files || files.length === 0) {
        showToast("Please upload image or video", "error");
        return;
      }

      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // allow only image or video
        if (
          !file.type.startsWith("image/") &&
          !file.type.startsWith("video/")
        ) {
          showToast("Only Image or Video files are allowed", "error");
          return;
        }

        formData.append("image", file); // changed from image -> media
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

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          showToast(data.message, "error");
        }
      } catch (err) {
        console.error("AJAX error:", err);
        showToast("Something went wrong. Please try again later.", "error");
      }
    });
});

function showToast(message, toastType) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: toastType === "success" ? "#28a745" : "#dc3545",
  }).showToast();
}