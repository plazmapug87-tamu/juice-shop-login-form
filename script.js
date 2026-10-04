document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorMsg = document.getElementById('errorMsg');
  const successMsg = document.getElementById('successMsg');

  errorMsg.textContent = '';
  successMsg.textContent = '';

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // ----- CLIENT-SIDE VALIDATION -----
  if (email === '' || password === '') {
    errorMsg.textContent = 'Email and password cannot be empty.';
    return;
  }

  if (!isValidInput(email, password)) {
    errorMsg.textContent = 'Email must contain "@" and password must be at least 8 characters.';
    return;
  }

  // ----- SEND TO SERVER FOR SERVER-SIDE VALIDATION -----
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      successMsg.textContent = data.message;
    } else {
      errorMsg.textContent = data.message;
    }
  } catch (err) {
    errorMsg.textContent = 'Could not reach server. Is the backend running? (node server.js)';
  }
});

// Client-side validation function:
// checks the email contains "@" and the password is at least 8 characters
function isValidInput(email, password) {
  const hasAt = email.includes('@');
  const longEnoughPassword = password.length >= 8;
  return hasAt && longEnoughPassword;
}
