document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2799; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //displayImg();
  main();

  function main() {
    loadImg();
    likeFeature();
    addComment();
 }


  function loadImg() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(json => displayImg(json))
  }

  function displayImg(image) {
    console.log(image.name);
    const imgCard = document.getElementById("image_card")
    const img = document.getElementById("image");
    img.src = image.url;
    const imgName = document.getElementById("name")
    imgName.textContent = image.name;
    const likes = document.getElementById("likes");
    likes.textContent = image.like_count;
    const ul = document.getElementById("comments");
    image.comments.forEach(comment => {
      //const listItem = document.createElement("li");
      //listItem.textContent = comment.content;
      const listItem = buildComment(comment, ul);

      //ul.appendChild(listItem);
    })
  }

  function buildComment(comment, ul) {
    const li = document.createElement("li")
    li.textContent = comment.content + " ";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete';
    deleteButton.id = comment.id;
    deleteButton.addEventListener('click', function(event) {
      deleteComment(event, comment);
    });
    li.appendChild(deleteButton);
    ul.appendChild(li);
  }

  function likeFeature() {
    const likeCount = document.getElementById("likes");
    const likeButton = document.getElementById("like_button");
    likeButton.addEventListener('click', function(event){
      updateLikes(event, likeCount);
    })
  }

  function updateLikes(event, likeCount) {
    //console.log(event);
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    })
    .then(resp => resp.json())
  }

  function addComment() {
    const commentSection = document.getElementById("comments");
    const commentForm = document.getElementById("comment_form");
    commentForm.addEventListener('submit', function(event) {
      event.preventDefault();
      updateComment(event, commentSection);
    })
  }

  function updateComment(event, commentSection) {
    //const newComment = document.createElement("li");
    const commentContent = event.target[0].value;
    const commentInput = document.getElementById("comment_input");
    //newComment.textContent = commentContent;
    //commentSection.appendChild(newComment);
    commentInput.value = "";
    const ul = document.getElementById('comments');
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId, content: commentContent})
    })
    .then(resp => resp.json())
    .then(json => buildComment(json, ul))
  }

  function deleteComment(event, comment) {
    const button = document.getElementById(`${comment.id}`);
    const target = button.parentElement;
    //console.log(button.parentElement);
    fetch(commentsURL + '/' + comment.id, {
      method: 'DELETE',
    })
    .then(resp => resp.json())
    .then(json => {
      target.remove();
    })
  }

})
