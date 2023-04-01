// const searchForm = document.querySelector('form');
// const searchBar = document.querySelector('#search-bar').value;
// const recipeContainer = document.querySelector('#recipe-container');

// const baseURL = "https://api.spoonacular.com/recipes/";
// const key = "9364ffa2e0f84be6902d065f72360c25";

// searchForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const apiUrl = `${baseURL}complexSearch?apiKey=${key}&query=${searchBar}&number=20`;

//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       const recipes = data.results;
//       recipeContainer.innerHTML = '';
//       recipes.forEach(recipe => {
//         const recipeCard = createRecipeCard(recipe);
//         recipeContainer.appendChild(recipeCard);
//       });
//     })
//     .catch(error => console.error(error));
// });

// function createRecipeCard(recipe) {
//   const recipeCard = document.createElement('div');
//   recipeCard.classList.add('recipe-card');
//   recipeCard.innerHTML = `
//     <li>  <a><img src="${recipe.image}" alt="${recipe.title}"></a>
//     <h3>${recipe.title}</h3>
//   </li>`;

//   // add event listener to recipe card
//   recipeCard.addEventListener('click', () => {
//     const recipeId = recipe.id;
//     window.location.href = `recipe.html?id=${recipeId}`;
//   });

//   return recipeCard;
// }

const searchForm = document.querySelector('form');
const recipeContainer = document.querySelector('#recipe-container');
const randomSearch = document.querySelector('#randomSearch-btn');
const baseURL = "https://api.spoonacular.com/recipes/";
const key = "9364ffa2e0f84be6902d065f72360c25";

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchBar = document.querySelector('#search-bar').value;

  let apiUrl = `${baseURL}complexSearch?apiKey=${key}&query=${searchBar}&number=20`;

  fetchRecipes(apiUrl);
});

function randomRecipes() {
  const randomOffset = Math.floor(Math.random() * 20);
  let apiUrl = `${baseURL}complexSearch?apiKey=${key}&number=20&offset=${randomOffset}`;
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
  const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipe-card');
  recipeCard.innerHTML = `
    <li>  <a><img src="${recipe.image}" alt="${recipe.title}"></a>
    <h3>${recipe.title}</h3>
  </li>`;

  // add event listener to recipe card
  recipeCard.addEventListener('click', () => {
    const recipeId = recipe.id;
    window.location.href = `recipe.html?id=${recipeId}`;
  });

  return recipeCard;
}