const editPostFormHandler = async (event) => {
    // Stop the browser from submitting the form

    event.preventDefault();

    // Gather the information from the form element on the page
    const post_title = document.querySelector('#edit_post_title').value.trim();
    const post_content = document.querySelector('#edit_post_content').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1 ];


    if (post_title && post_content) {

        const response = fetch('/editedpost', {
            method: 'PUT',
            body: JSON.stringify({
                post_title,
                post_content,
                post_id
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        alert("Your post has been edited");
        window.location.replace("/");

 
    } else {
        console.log("no post");
        alert('Failed to create post');
    }

    
};
  
  // Listens for user to select Submit
  document
    .querySelector('#edit_post_card')
    .addEventListener('click', editPostFormHandler);