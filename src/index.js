
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')


  
  main()

  

})

let imageId = 2801

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`


function main() {
  loadImages()
  commentSubmit()
}


function loadImages() {
  fetch(imageURL)
  .then(resp => resp.json())
  .then(json => renderImage(json) )
}

function renderImage(json) {
  console.log(json)


  let image = document.getElementById('image')
  image.src = json.url
  let title = document.getElementById('name')
  title.textContent = json.name
  let likes = document.getElementById('likes')
  likes.textContent = json.like_count

  for (let i = 0; i < json.comments.length; i++) {
    appendComments(json.comments[i]);
  }



  likeBtn = document.getElementById('like_button')
  likeBtn.addEventListener('click', () => {
    json.like_count ++
    likeButton(json)
  })
}

function appendComments(comment) {
  let ul = document.getElementById('comments')
  let li = document.createElement('li')
  li.textContent = comment.content
  deleteButton(li, comment.id)
  ul.appendChild(li)
}

function likeButton(json) {
  likes = document.getElementById('likes')
  likes.textContent = json.like_count
  
  fetch(likeURL, {
    method: 'POST', 
    headers: { 'Accept': 'application/json',
    'Content-type': 'application/json'},
    body: JSON.stringify({image_id: imageId})
  })
  .then(resp => resp.json())
  .then(json => console.log(json))
}

function commentSubmit () {
  let form = document.getElementById('comment_form')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    content = ev.target.elements['comment'].value
    console.log(content)
    let ul = document.getElementById('comments')
    let li = document.createElement('li')
    li.textContent = content;
    
    ul.appendChild(li)

    input = document.getElementById('comment_input')
    input.value = ""

    commentPost(content, li)
  })

}

function commentPost(content, li) {
  fetch(commentsURL, {
    method: 'POST',
    headers: {'Accept': 'application/json',
    'Content-type': 'application/json'
    },
    body: JSON.stringify({image_id: imageId, content: content})
  })
  .then(resp => resp.json())
    .then(json => deleteButton(li, json.id))
}

function deleteButton(li, id) {
  delBtn = document.createElement('button') 
  delBtn.textContent = "X"
  li.appendChild(delBtn)

  delBtn.addEventListener('click', () => {
    li.remove()

    fetch(commentsURL + '/' + id, {
      method: 'DELETE', 
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }

    })
  })
}