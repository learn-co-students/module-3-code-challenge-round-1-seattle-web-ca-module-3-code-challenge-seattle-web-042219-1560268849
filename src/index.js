document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId =  2806

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  loadImage()

  function loadImage() {
    fetch(imageURL)
    .then(res => res.json())
    .then(pic => {
      displayImage(pic)
    })
  }

// function dislplayImages(pics) {
//   pics.forEach(pic => {
//     displayImage(pic)
//   })
// }

function displayImage(pic) {

  let h4 = document.getElementById('name')
  let img = document.getElementById('image')
  let likes = document.getElementById('likes')
  let comments = document.getElementById('comments')
  let likeBtn = document.getElementById('like_button')

  img.src = pic.url
  h4.textContent = pic.name
  likes.textContent = pic.like_count
  comments.textContent = pic.comments.content

  likeBtn.addEventListener('click', () => {
    addLikes(pic, likes)
  })

}

function addLikes(pic, likes) {
  pic.likes++
  let config = {
    method: 'PUT',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({image_id: 2806})
  }

  fetch(likeURL + pic.id, config)
  .then(res => res.json())
  .then(json => {
    
  })
}

})
