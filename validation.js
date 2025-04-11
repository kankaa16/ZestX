const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  let errors = [];

  const firstname = firstname_input.value.trim();
  const email = email_input.value.trim();
  const password = password_input.value;
  const repeatPassword = repeat_password_input.value;

  if (!firstname) errors.push("Firstname is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  if (password.length < 8) errors.push("Password must have at least 8 characters");
  if (password !== repeatPassword) errors.push("Passwords do not match");

  if (errors.length > 0) {
    e.preventDefault(); 
    error_message.textContent = errors.join(". ");
  }
});