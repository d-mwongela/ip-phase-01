const baseURL = "http://localhost:3000";
async function getRequest(foodrink) {
  const responseFromDB = await fetch(baseURL + foodrink, { method: "GET" })
  .then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return " Not in the menu";
    }
  })
  .catch((error) => {console.log(error);});return responseFromDB;
};

async function handleRequest() {
  const foodrinks = await getRequest("/foodrink");
  return foodrinks;
};let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{

  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');

}

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }else{
    document.querySelector('#scroll-top').classList.remove('active');
  }

}

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut();
//header navbar
handleRequest().then((foodrinks) => {
  const navUl = document.querySelector('#foodrink-list')
  foodrinks.forEach(foodrink =>{
    const foodrinkNameList = document.createElement('li')
    foodrinkNameList.textContent = foodrink.name
    foodrinkNameList.setAttribute("id", foodrink.id);
    foodrinkNameList.addEventListener("click", () => handleMain(foodrink))
    navUl.appendChild(foodrinkNameList)
  })
});

function handleMain(foodrinkInfo) {
  
  //elements targeted by ID
  const name = document.querySelector('#foodrink-name')
  const image = document.querySelector('#foodrink-image')
  const descrip = document.querySelector('#foodrink-description')

  name.innerText = foodrinkInfo.name
  image.setAttribute("src", foodrinkInfo.image_url);
  image.setAttribute("alt", foodrinkInfo.name);
  descrip.innerText = foodrinkInfo.description

 
  const reviewList = document.querySelector('#review-list')
  reviewList.innerHTML = ""
  foodrinkInfo.reviews.forEach(review => {
   
    const newList = document.createElement('li')
    newList.textContent = review
    reviewList.appendChild(newList)
  })
}

document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('review-form').addEventListener('submit', event=>{
    event.preventDefault();
    const form = event.target;
    document.getElementById('review-list').innerHTML += `<li>${form.review.value}</li>`;
    form.reset();
  })
})

const updatePatch=()=> {
  fetch(`http://localhost:3000/foodrinks/${id_element}`,{
    method : "PATCH",
    headers : {
      "content-type" : "application/json; charset =utf-8"
    },
    body : JSON.stringify({
      "description" : description.value
    })
  }).then(response=> response.json())
  .then(foodrinkdata => console.log(foodrinkdata))
}

const updateFormDescription = ()=> {
  const descriptionForm = document.querySelector("#description-form");
  descriptionForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const updatedDescription = document.querySelector("#description");
    const descriptionToUpdate = document.querySelector("#beer-description");
    descriptionToUpdate.textContent = updatedDescription.value;
    descriptionForm.reset();
  })
  updatePatch()
}
updateFormDescription()
