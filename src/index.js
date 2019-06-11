document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2807 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  loadImage();

  function loadImage() {
    fetch(imageURL)
    .then(res => res.json())
    .then(json => {
      displayImage(json);
    })
  }

  function displayImage(image) {
    let picture = document.getElementById('image');
    let name = document.getElementById('name');

    picture.src = image.url;
    name.textContent = image.name;
    displayComments(image.comments);
    displayLikes(image);

    likeSubmit(image);
    commentSubmit();
  }

 //////////////////////////////LIKES//////////////////////////////////

  function displayLikes(image) {
    let likes = document.getElementById('likes');
    likes.textContent = image.like_count;
  }

  function likeSubmit(image) {
    likeBtn = document.getElementById('like_button');

    likeBtn.addEventListener('click', () => {
      addLike(image);
    })
  }

  function addLike(image) {
    let likes = document.getElementById('likes');
    likes.textContent = parseInt(likes.textContent, 10) + 1;

    let payload = {image_id: 2807}

    console.log(imageURL)

    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(json => {
    });
  }

  ////////////////////////////////////COMMENTS/////////////////////////////////////

  function displayComments(comments) {
    console.log(comments);
    comments.forEach(comment => displayComment(comment.content));
  }

  function displayComment(comment) {
    commentList = document.getElementById('comments');

    newComment = document.createElement('li');

    newComment.textContent = comment;

    commentList.appendChild(newComment);
    console.log(commentList);
  }

  function commentSubmit() {
    commentForm = document.getElementById('comment_form');
    comment = document.getElementById('comment_input');

    commentForm.addEventListener('submit', (ev) => {
      ev.preventDefault();

      if (comment.value != ''){
        addComment(comment.value)
      }
    })
  }

  function addComment(comment) {
    console.log(comment);

    displayComment(comment);

    let payload = {image_id: 2807, content: comment};

    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(json => {
    });
  }
})
