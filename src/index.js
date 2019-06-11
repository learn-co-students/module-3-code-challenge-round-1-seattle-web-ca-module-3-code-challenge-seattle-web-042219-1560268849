

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2802

  const imageURL = "https://randopic.herokuapp.com/images/2802"

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let comment_id_container = ""

  function main() {
    fetchImage()
    attachListeners()
  }

  main()

  function fetchImage() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(json => {
      displayImage(json)
      })
    }

  function fetchLike() {
    let payload = {image_id: imageId}
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    fetch(likeURL, config)
    .then(resp => resp.json())
    .then(json => {

    })
  }

  function fetchComment(content, inputElem) {
    inputElem.value = ""

    let payload = {
      image_id: imageId,
      content: content
    }
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    fetch(commentsURL, config)
    .then(resp => resp.json())
    .then(json => {
      getCommentId(json)
    })

  }

  function fetchDeleteComment(comment_id) {
    let config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

      fetch(commentsURL + `${comment_id}`, config)
      .then(resp => resp.json())
      .then(json => {
        
      })
  }

  function attachListeners() {
    likeButton = document.getElementById('like_button')
    let span = document.getElementById('likes')
    likeButton.addEventListener('click', () => {
      fetchLike()
      span.textContent++
    })

    let ul = document.getElementById('comments')
    let form = document.getElementById('comment_form')
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()
      let li = document.createElement('li')
      let input = document.getElementById('comment_input')
      let content = ev.target.elements["comment"].value
      li.textContent = content
      ul.appendChild(li)
      delButton = document.createElement("button")
      delButton.textContent = "Delete"
      
      li.appendChild(delButton)
      fetchComment(content, input)
      delButton.setAttribute('comment-id', comment_id_container)
      
      delButton.addEventListener('click', () => {
        li.remove()
        fetchDeleteComment(delButton.attributes[0].value)
      })

    })
  }

  function getCommentId(json) {
    comment_id_container = json.id
  }
 




  function displayImage(json) {
    let img = document.getElementById('image')
    let h4 = document.getElementById('name')
    let span = document.getElementById('likes')
    let ul = document.getElementById('comments')
    img.src = json.url
    h4.textContent = json.name
    span.textContent = json.like_count



    json.comments.forEach((comment) => {
      let li = document.createElement('li')
      let delButton = document.createElement('button')
      delButton.textContent = "Delete"
      li.textContent = comment.content
      ul.appendChild(li)
      li.appendChild(delButton)

      delButton.addEventListener('click', () => {
        li.remove()
        fetchDeleteComment(comment.id)

      })
    })
  }












})
