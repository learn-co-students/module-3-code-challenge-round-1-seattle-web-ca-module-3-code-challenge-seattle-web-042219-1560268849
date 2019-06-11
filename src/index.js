document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2803 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchInfo()
  displayLikes()
  addEventToLikeButton()
  addEventToCommentForm()

  function fetchInfo(){
    fetch(imageURL)
    .then(res=>{return res.json()})
    .then(json=>{
      renderImage(json)
      displayComments(json)
    })
  }

function renderImage(image){
  let div = document.getElementById("image_card")
  let img = document.getElementById("image")
      img.src = image.url
  let name = document.getElementById("name")
      name.textContent = image.name
    }


function displayLikes(){
  fetch(imageURL)
  .then(res=>{return res.json()})
  .then(json=>{
    let likesSpan = document.getElementById("likes")
    likesSpan.textContent = json.like_count
  })
}

function displayComments(image){
  image.comments.forEach((comment)=>{
    showComment(comment)
  })
}

function showComment(comment){
  let ul = document.getElementById("comments")
  let li = document.createElement("li")
  let button = document.createElement("button")
  button.textContent = "delete"
  button.addEventListener("click", ()=>{
    deleteComment(comment, li)
  })
  li.textContent = comment.content
  li.appendChild(button)
  ul.appendChild(li)
}

function addEventToLikeButton(){
  let likeButton = document.getElementById("like_button")
  likeButton.addEventListener("click", ()=>{
    incrementLike()
  })
}

function incrementLike(){
  let likesSpan = document.getElementById("likes")
  likesSpan.textContent++

    let payload = {image_id: imageId}
    let config = {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    }
    fetch(likeURL, config)
    .then(res=>{return res.json()})
    .then()
}

// <form id="comment_form">
// <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
// <input type="submit" value="Submit"/>
// </form>

function addEventToCommentForm(){
  let form = document.getElementById("comment_form")
  form.addEventListener("submit",(ev)=>{
    ev.preventDefault()
    addComment(ev)
    form.reset()
  })
}

function addComment(ev){
  let content = ev.target[0].value

  // Optimistic version-- added pessimistic to add Delete button w/id on creation 
  // let ul = document.getElementById("comments")
  // let li = document.createElement("li")
  // li.textContent = content
  // ul.appendChild(li)

  let payload = {image_id: imageId, content: content}
    let config = {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    }
    fetch(commentsURL, config)
    .then(res=>{return res.json()})
    .then(json=>{
      showComment(json)
    })
}

function deleteComment(comment, li){
  let config = {
    method: 'DELETE',
  }

  fetch(commentsURL + "/" + comment.id, config)
  .then(res => res.json())
  .then(json => {
    li.remove() 
  })
}  

})