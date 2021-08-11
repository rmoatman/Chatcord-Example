const commentFormHandler = async (event) => {
    // Stop the browser from submitting the form
    console.log("commentFormHandler");
    event.preventDefault();

    // Gather the information from the form element on the page
    const commentText = document.querySelector('#new_comment').value.trim();
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1 ];
    const comment_date = new Date().toLocaleDateString();

    if (commentText) {

        const response = fetch('/comment', {
            method: 'POST',
            body: JSON.stringify({
                commentText,
                blog_id,
                comment_date

            }),
            headers: { 'Content-Type': 'application/json' },
        });

        alert("Your comment has been created");
        window.location.replace("/");;
  
    } else {
        console.log("no comment");
        alert('Failed to create comment');
    }
    
};
  
  // Listens for returning user to select Submit
  document
    .querySelector('#comment-card')
    .addEventListener('click', commentFormHandler);
  