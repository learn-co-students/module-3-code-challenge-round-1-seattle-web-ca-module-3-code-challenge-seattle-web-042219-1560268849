const imageId = 2804 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  main()
})

function main(){
    fetchImage()
  }

  function fetchImage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(image => {
      displayImage(image)
    })
  }

  function displayImage(image){
    let img = document.getElementById('image')
    let name = document.getElementById('name')
    let likes = document.querySelector('span')
    let comments = document.getElementById('comment_input')

    img.src = image.url
    name.textContent = image.name
    likes.textContent = image.like_count

    likes.setAttribute('span', image.id)
    comments.setAttribute('comment_input', image.id)

    let submitButton = document.getElementById('submit')
      submitButton.addEventListener('click', (ev) => {
        ev.preventDefault()
        submitComment(image.id)
      })

    let likeButton = document.getElementById('like_button')
      likeButton.addEventListener('click', (ev) => {
        ev.preventDefault()
        showLike(image.id)
      })

    likeButton.setAttribute('like_button', image.id)
  }

  function showLike(image_id){
    let like = document.querySelector('span')
    let increaseLike = parseInt(document.querySelector('span').innerText)

    increaseLike ++

    like.textContent = increaseLike
    let payload = {image_id: imageId}

    fetch(likeURL, {
      method: 'Post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }

  function submitComment(image_id){
    let ul = document.getElementById('comments')
    let li = document.createElement('li')

    li.textContent = document.getElementById('comment_input').value

    ul.appendChild(li)

    let input = document.getElementById('comment_input').value
    let payload = {image_id: imageId, content: input}

  fetch(commentsURL, {
    method: 'Post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => console.log(res))
}
