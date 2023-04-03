
const searchForm = document.querySelector('form');
const recipeContainer = document.querySelector('#recipe-container');
const randomSearch = document.querySelector('#randomSearch-btn');
const baseURL = "https://api.spoonacular.com/recipes/";
const key = "9364ffa2e0f84be6902d065f72360c25";

const cuisineContainer = document.getElementById('cuisine-container');

// Fetch cuisines from JSON file
fetch('https://raw.githubusercontent.com/JoseAndresGGiron/wdd330/main/src/json/cuisines.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Create <a> element for each cuisine
    data.cuisines.forEach(cuisine => {
      const cuisineLink = document.createElement('a');
      cuisineLink.href = "#";
      cuisineLink.textContent = cuisine.name;

      cuisineLink.addEventListener('click', () => {

        const apiUrl = `${baseURL}complexSearch?apiKey=${key}&number=10&cuisine=${cuisine.name}`;
        fetchRecipes(apiUrl)
          .catch(error => console.error(error));
      });
      const cuisineListItem = document.createElement('li');
      cuisineListItem.appendChild(cuisineLink);

      cuisineContainer.appendChild(cuisineListItem);
    });
  })
  .catch(error => console.error(error));

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchBar = document.querySelector('#search-bar').value;

  let apiUrl = `${baseURL}complexSearch?apiKey=${key}&query=${searchBar}&number=20`;

  fetchRecipes(apiUrl);
});

function randomRecipes() {
  const randomOffset = Math.floor(Math.random() * 20);
  let apiUrl = `${baseURL}complexSearch?apiKey=${key}&number=10&offset=${randomOffset}`;
  fetchRecipes(apiUrl);
}

function fetchRecipes(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const recipes = data.results;
      recipeContainer.innerHTML = '';
      recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeContainer.appendChild(recipeCard);
      });
    })
    .catch(error => console.error(error));
}

function createRecipeCard(recipe) {
  const recipeCard = document.createElement('li');
  recipeCard.classList.add('recipe-card');
  recipeCard.innerHTML = `
    <a><img src="${recipe.image}" alt="${recipe.title}"></a>
    <h3>${recipe.title}</h3>`;
  

  // add event listener to recipe card
  recipeCard.addEventListener('click', () => {
    const recipeId = recipe.id;
    window.location.href = `recipe.html?id=${recipeId}`;
  });

  return recipeCard;
}