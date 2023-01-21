let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys(){
fetch('http://localhost:3000/toys')
 .then(res => res.json())
 .then(toyData => renderToys(toyData))
}

fetchToys()

function renderToys(toys) {

  toys.forEach(toy => {
    const toyCollection = document.querySelector('#toy-collection')
    const card = document.createElement('div')
    card.className = 'card'
    

    const h2 = document.createElement('h2')
    h2.textContent = toy.name
    
    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'
  
    const p = document.createElement('p')
    p.textContent = toy.likes
  
    const button = document.createElement('button')
    button.className = 'like-btn'
    button.id = toy.id
    button.textContent = 'Like'
    // ^^^giving our buttons a name so the name appears on the button

    // below is PATCH
    button.addEventListener('click', () =>{
      
      p.textContent = parseInt(p.textContent) + 1

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
           Accept: "application/json"},
        body: JSON.stringify({
          likes: parseInt(p.textContent)
        })
      })

    })

    card.append(h2, img, p, button)
    toyCollection.appendChild(card)
  })

}

function addNewToy() {
  const form = document.querySelector("body > div.container > form")
  form.addEventListener('submit', (e)=> {
    e.preventDefault()
    const inputName = e.target['name'].value
    const inputImage = e.target['image'].value
    
    const newToy = {
      name: inputName,
      image: inputImage,
      likes: 0

    }
    // renderToys([newToy]) 
    // ^^^commented out to make POST request w pessimistic rendering
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Accept: "application/json"},
      body: JSON.stringify(newToy)
    })
    .then(r => r.json())
    .then(toyObj => renderToys([toyObj]))
    // ^^^if commented out both then and uncommented out renderToys([newToy])
    // it would be optimistic rendering
    })
}

addNewToy()


  

