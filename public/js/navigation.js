const homeFormHandler = (event) => {
    // Stop the browser from submitting the form
    window.location.replace("/");
};
      
  // Listens for Home button to be selected
  document
    .querySelector('#home-button')
    .addEventListener('click', homeFormHandler);


const dashboardFormHandler = (event) => {
    // Stop the browser from submitting the form
    window.location.replace("/dashboard");
};
        
// Listens for Delete button to be selected
document
.querySelector('#dashboard-button')
.addEventListener('click', dashboardFormHandler);