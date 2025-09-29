const deleteImage = async (imageId) => {
  try {
    const response = await fetch(`/v2/admin/delete-image/${imageId}`, {
      method: "POST",
    });

    const data = await response.json();
    if (data.status) {
      showToast(data.message, "success");
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
};

function showToast(message, toastType) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: "top", // or "top"
    position: "right", // left, center, or right
    backgroundColor: toastType === "success" ? "#28a745" : "#dc3545",
  }).showToast();
}
