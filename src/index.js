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
fetch("http://localhost:3000/toys")
 .then(res => res.json())
 .then(json => renderToys(json))
}

function renderToys(toys) {
  toys.forEach((toy) => {
    const toyCollection = document.querySelector("#toy-collection")
    const card = document.createElement("div")
    card. className = 'card'

    const h2 = document.createElement('h2');
    h2.textContent = toy.name;

    const img = document.createElement('img');
    img.src = toy.img;
    img.className = 'toy-avatar';

    const p = document.createElement('p');
    p.textContent = toy.likes

    const button = document.createElement('button');
    button.className = 'like-btn';
    button.id = 'toy_id'
    button.textContent = 'like';

    card.appendChild(h2);

    card.append(h2, img)

  })
}


 
  


  

