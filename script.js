const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.focus()

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value)

  if(e.key === 'Enter') {
    setTimeout(() => {
      e.target.value = ''
    },10)
    
    randomSelect()
  }
})

function createTags(input){
  //split string by , and turn into array
  //filter array method, each tag will trim any white space
  //map(manipulate) - can't be an empty string, will trim white space 
  const tags = input.split(',').filter(tag => tag.trim()!== '').map(tag => tag.trim())

  //clean the tags
  tagsEl.innerHTML = ''

  tags.forEach(tag => {
    const tagEl = document.createElement('span')
    tagEl.classList.add('tag')
    tagEl.innerText = tag

    //div the id tags
    tagsEl.appendChild(tagEl)
  })
}


function randomSelect(){
  const times = 30

  // interval goes off every 100 miliseconds, will pick a random tag
  // and then highlight it, or unhighlighting it
  const interval = setInterval(() => {
    const randomTag = pickRandomTag()

    highlightTag(randomTag)

    setTimeout(() => {
      unHighlightTag(randomTag)
    }, 100)
  }, 100)

  // takes care of stopping it and pick random tag to land on it
  setTimeout(() => {
    //clear interval to stop it
    clearInterval(interval)
    setTimeout(()=> {
      const randomTag = pickRandomTag()

      highlightTag(randomTag)
    }, 100)
  }, times * 100)
}

function pickRandomTag() {
  //querySelectorAll creates a nodelist 
  const tags = document.querySelectorAll('.tag')
  // returns tags that are in nodelist
  return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag){
  tag.classList.add('highlight')
}

function unHighlightTag(tag){
  tag.classList.remove('highlight')
}