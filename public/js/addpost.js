const newPostFormHandler = async (event) => {
    // Stop the browser from submitting the form

    event.preventDefault();

    // Gather the information from the form element on the page
    const post_title = document.querySelector('#new_post_title').value.trim();
    const post_content = document.querySelector('#new_post_content').value.trim();
    const date = new Date().toLocaleDateString();

    if (post_title && post_content) {

        const response = fetch('/newpost', {
            method: 'POST',
            body: JSON.stringify({
                post_title,
                post_content,
                date,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        alert("Your post has been created");
        window.location.replace("/");

 
    } else {
        console.log("no post");
        alert('Failed to create post');
    }

    
};
  
  // Listens for user to select Submit
  document
    .querySelector('#new_post_card')
    .addEventListener('click', newPostFormHandler);