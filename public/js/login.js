// Action taken when Submit button is selected
const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form 
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {

    // Send the e-mail and password to the server (user-Routes)
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If user exists, sign them in and redirect to homepage (home-Routes)
    if (response.ok) {
      alert("Please be respectful to others on this site.");
      window.location.replace('/');
 
    } else {
        alert('Incorrect Username or Password.  Try again.');
    }
  }
};

// Action taken when Signup button is selected
const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form
  event.preventDefault();

  // Send the e-mail and password to the server
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    // If user credentials are complete, save credentials to the user_db
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If credentials are saved, sign user in and redirect to homepage
    if (response.ok) {
      alert("Your account has been created.  Please sign in.");
      window.location.replace('/');

    } else {
      alert('Failed to sign up.  Please try again.');
    }
  }
};

// Listens for returning user to select Login
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Listens for new user to select Signup
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

