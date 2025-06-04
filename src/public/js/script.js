// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1200,
  once: true,
});

// Initialize Rellax (Parallax effect on elements with class 'rellax')
var rellax = new Rellax('.rellax', {
  center: true,
  round: true,
  vertical: true,
  horizontal: false,
});

// Booking form submission
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;

  if (!name || !email || !phone || !service) {
    alert('Please fill in all required fields.');
    return;
  }

  // Basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Basic phone validation (digits only, 7-15 length)
  const phonePattern = /^[0-9]{7,15}$/;
  if (!phonePattern.test(phone)) {
    alert('Please enter a valid phone number (7-15 digits).');
    return;
  }

  // Simulate form submission
  alert(`Thank you, ${name}! Your booking for the ${service} Aavarthis Thila Homam has been received. We will contact you shortly.`);

  // Reset form
  this.reset();
});
